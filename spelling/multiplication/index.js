import { deduplicate, round, speak, sentenceToId, clearComplete, pluralise } from '../utils.js';
import data, { numberWords } from './data.js';
import { createWordBackground } from '../word-background.js';

export const multiplicationConfig = {
  stateName: 'multiplication-state',
  testCount: 12,
  completedTestCount: 1200, // How many times to test each number sentence
  completedFieldsReward: 50,
  rewardsKey: 'multiplication-rewards',
  redeemedKey: 'multiplication-redeemed',
  nameKey: 'spelling-name',
  uiStateKey: 'multiplication-ui-state',
  tableSelectorKey: 'multiplication-ui-table',
  darkModeKey: 'spelling-dark-mode'
};

let name = '';

// Entries here will be the only tables tested e.g. ["2 x 2 = 4", "3 x 2 = 6"]
let tempOverrideTables = [];

const helpHtml = `<p>Completing all ${multiplicationConfig.testCount} tests earns ${multiplicationConfig.completedFieldsReward} points!</p>`;

export function initMultiplication() {
  let completed = false;

  // Double click page title to enter overrides into localStorage
  const overridesKey = `${multiplicationConfig.stateName}-overrides`;
  const storedOverrides = (localStorage.getItem(overridesKey) || '').replace(/,\s*/g, '|').split('|').filter(Boolean);
  if (storedOverrides.length) {
    tempOverrideTables = storedOverrides;
  }

  // Tables
  const allTables = deduplicate(tempOverrideTables.length ? tempOverrideTables : [
    ...data.tables
  ]);
  const multiplicationState = JSON.parse(localStorage.getItem(multiplicationConfig.stateName) || '{}');
  const incompleteTables = allTables.filter(word => !((multiplicationState[word] || 0) >= multiplicationConfig.completedTestCount));

  // Rewards
  const rewardsTotal = JSON.parse(localStorage.getItem(multiplicationConfig.rewardsKey) || 0);
  const redeemedAmount = JSON.parse(localStorage.getItem(multiplicationConfig.redeemedKey) || 0);
  let rewardsDisplayAmount = rewardsTotal - redeemedAmount;

  // Ensure rewardsTotal is not negative
  if (rewardsDisplayAmount < 0) {
    localStorage.setItem(multiplicationConfig.redeemedKey, rewardsTotal);
    rewardsDisplayAmount = 0;
  }
  const rewardsText = `🌟 ${rewardsDisplayAmount}`;

  // Check for table selector mode
  const selectedTable = localStorage.getItem(multiplicationConfig.tableSelectorKey);

  // Check for saved UI state to restore the same tables
  const savedUiState = JSON.parse(localStorage.getItem(multiplicationConfig.uiStateKey) || '{}');
  const savedUiStateTables = savedUiState.tables || [];
  const savedUiStateValues = savedUiState.values || {};

  // Name
  name = localStorage.getItem(multiplicationConfig.nameKey) || '';
  if (name) {
    $('#title').innerHTML = `Hi, ${name}!`;
    $('#title').onclick = () => {
      if (confirm('reset name?')) {
        localStorage.removeItem(multiplicationConfig.nameKey);
        window.location.href = './index.html';
      }
    };
  }
  else {
    $('#title').innerHTML = 'Multiplication';
  }
  $('#help-icon').style.display = 'inline-block';

  let tables;

  if (selectedTable) {
    // Table selector mode
    const tableNum = parseInt(selectedTable, 10);
    tables = [];
    for (let i = 1; i <= multiplicationConfig.testCount; i++) {
      tables.push(`${i} x ${tableNum} = ${i * tableNum}`);
    }
  } else if (savedUiStateTables.length > 0 && savedUiStateTables.every(table => incompleteTables.includes(table))) {
    // Restore the same tables if there's saved progress
    tables = savedUiStateTables;
  } else {
    // Generate new shuffled tables
    let shuffledTables = incompleteTables
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    tables = shuffledTables.slice(0, multiplicationConfig.testCount);

    // Clear any stale UI state data
    localStorage.removeItem(multiplicationConfig.uiStateKey);
  }

  if (!tables.length) {
    $('#title').innerHTML = "Congratulations!<div class='complete-message'>You have completed every test 😊😊</div>";
    $('#rewards').style.top = 0;
    $('#help-icon').style.display = 'none';
    updateResultsUI(true, true);
  }

  function updateResults() {
    const isComplete = tables.reduce((allCorrect, word) => {
      const input = $(`#${sentenceToId(word)}`);
      const answer = input?.value.trim();
      let isCorrect = answer === word;

      if (input.value) {
        // Auto correct case
        if (!isCorrect && answer.toLowerCase() === word.toLowerCase()) {
          input.value = word;
          isCorrect = true;
        }
        input.className = isCorrect ? 'correct' : 'incorrect';
      }
      return allCorrect && isCorrect;
    }, true);

    if (!completed && isComplete) {
      completed = true;
      tables.forEach(word => {
        multiplicationState[word] = (multiplicationState[word] || 0) + 1;
      });
      localStorage.setItem(multiplicationConfig.stateName, JSON.stringify(multiplicationState));
      localStorage.setItem(multiplicationConfig.rewardsKey, round(rewardsTotal + multiplicationConfig.completedFieldsReward, multiplicationConfig.completedFieldsReward));
      // Clear saved UI state
      localStorage.removeItem(multiplicationConfig.uiStateKey);

      $('#complete-overlay').style.left = 0;
      $('#complete-overlay').style.right = 0;
      speak(`Awesome job ${name}! You are rocking it! Go go go`);
      setTimeout(() => {
        clearComplete();
      }, 3500);
    }
  }

  const getNumberUI = (sentenceId) => {
    let ui = '<div class="number-buttons">';
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((i) => {
      ui += `<div class="number-button paused" id="${sentenceId}-${i}">${i}</div>`;
    });
    return `${ui}</div>`;
  };

  const fieldsHtml = tables.map((sentence) => {
    const sentenceId = sentenceToId(sentence);
    return `<div class="field"><input id="${sentenceId}" class="paused" type="text" autocorrect="off" autocapitalize="off" readonly /><span title="repeat" class="repeat">↻</span>${getNumberUI(sentenceId)}</div>`;
  }).join('');

  const resultsHtml = Object.entries(multiplicationState).map(([sentence, count]) => {
    const displayTable = /~/.test(sentence) ? `<s>${sentence.split('~')[0]}</s>` : sentence;
    return `<div class="results-sentence${count >= multiplicationConfig.completedTestCount ? ' completed-sentence' : ''}"><h3 id="result-${sentenceToId(sentence)}">${displayTable}</h3><span>${count}</span></div>`
  }).join('');

  // DOM elements
  setTimeout(() => {
    tables.forEach((sentence) => {
      let paused = true;
      const sentenceId = sentenceToId(sentence);

      const answerArr = sentence.replace(/\s?[x=]\s?/g, '|').split('|');
      const verbalPhrase = `${
        answerArr[0]
      } ${
        pluralise(numberWords[answerArr[1]])
      } are ${
        answerArr[2]
      }`;

      const input = $(`#${sentenceId}`);
      input.progress = 0;

      // Restore sentence if truthy in saved state
      if (savedUiStateValues[sentence]) {
        input.value = sentence;
        updateResults();
      }

      input.onfocus = () => {
        paused = false;
        speak(verbalPhrase);
        input.placeholder = '';
        input.classList.remove('paused');
        for (let i = 0; i < 10; i++) {
          const numberButton = $(`#${sentenceId}-${i}`);
          numberButton.classList.remove('paused');
        }
      }
      input.onblur = () => updateResults();
      input.placeholder = sentence.replace(/=.+/, '= 🤔');

      const clearInput = () => {
        input.value = '';
        input.progress = 0;
        input.classList.remove('correct');
        input.classList.remove('incorrect');
      };

      const repeatEl = $(`#${sentenceId} ~ .repeat`);
      repeatEl.onclick = () => {
        clearInput();
        input.focus();
        input.blur();
        input.placeholder = sentence;
        setTimeout(() => {
          input.placeholder = '';
        }, 1500);
      };

      const handleIncorrect = () => {
        speak('yowser!');
        input.focus();
        input.blur();
        setTimeout(clearInput, 1500);
      };

      for (let i = 0; i < 10; i++) {
        const numberButton = $(`#${sentenceId}-${i}`);
        numberButton.onclick = () => {
          if (paused || input.progress === 3) {
            return;
          }

          input.value += i;

          if (input.progress === 0 && String(input.value).length >= answerArr[0].length) {
            if (input.value === answerArr[0]) {
              speak(answerArr[0]);
              input.value += ' x ';
              input.progress = 1;
            }
            else {
              handleIncorrect();
            }
          }
          if (input.progress === 1 && String(input.value).length === answerArr[0].length + 3 + answerArr[1].length) {
            if (input.value === answerArr[0] + ' x ' + answerArr[1]) {
              speak(pluralise(numberWords[answerArr[1]]));
              input.value += ' = ';
              input.progress = 2;
            }
            else {
              handleIncorrect();
            }
          }
          if (input.progress === 2 && String(input.value).length === answerArr[0].length + 3 + answerArr[1].length + 3 + answerArr[2].length) {
            if (input.value === answerArr[0] + ' x ' + answerArr[1] + ' = ' + answerArr[2]) {
              speak(`are ${answerArr[2]}`);
              input.progress = 3;
              updateResults();

              // Save UI state to localStorage with all tables (only if not completed)
              if (!completed && input.value === sentence) {
                const uiState = JSON.parse(localStorage.getItem(multiplicationConfig.uiStateKey) || '{}');
                const values = uiState.values || {};
                values[sentence] = true;
                localStorage.setItem(multiplicationConfig.uiStateKey, JSON.stringify({
                  tables: tables,
                  values: values
                }));
              }
            }
            else {
              handleIncorrect();
            }
          }
        };
      }
    });
    $('#help-icon').onclick = () => {
      $('.tooltip .balloon').classList.toggle('show');
    };

    // Retest
    Object.keys(multiplicationState).forEach((word) => {
      const resultEl = $(`#result-${sentenceToId(word)}`);
      if (resultEl) {
        resultEl.ondblclick = () => {
          if (confirm(`Reset "${word}"?`)) {
            multiplicationState[`${word}~${Date.now()}`] = multiplicationState[word];
            delete multiplicationState[word];
            localStorage.setItem(multiplicationConfig.stateName, JSON.stringify(multiplicationState));
            location.reload();
          }
        };
      }
    });
  });

  $('#form-fields').innerHTML = fieldsHtml;
  $('#results').innerHTML = resultsHtml;
  $('#rewards').innerHTML = rewardsText;
  $('#help-text').innerHTML = helpHtml;

  // Generate table selector UI
  const tableSelectorHtml = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => {
    const isActive = selectedTable === String(num) ? ' active' : '';
    return `<div class="table-button${isActive}" data-table="${num}">${num}</div>`;
  }).join('');

  $('#table-selector').innerHTML = tableSelectorHtml;

  // Add click handlers for table selector buttons
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(num => {
    const button = $(`.table-button[data-table="${num}"]`);
    button.onclick = () => {
      const currentSelection = localStorage.getItem(multiplicationConfig.tableSelectorKey);

      if (currentSelection === String(num)) {
        localStorage.removeItem(multiplicationConfig.tableSelectorKey);
      } else {
        localStorage.setItem(multiplicationConfig.tableSelectorKey, String(num));
      }
      // Clear any saved UI state when switching mode
      localStorage.removeItem(multiplicationConfig.uiStateKey);

      location.reload();
    };
  });

  const isDarkMode = localStorage.getItem(multiplicationConfig.darkModeKey) === 'true';
  if (isDarkMode) {
    document.body.classList.add('words-bg');
    $('#dark-mode-toggle').innerHTML = '🌞';
  } else {
    document.body.classList.remove('words-bg');
    $('#dark-mode-toggle').innerHTML = '🌛';
  }
  $('#dark-mode-toggle').onclick = () => {
    const isCurrentlyDark = document.body.classList.toggle('words-bg');
    $('#dark-mode-toggle').innerHTML = isCurrentlyDark ? '🌞' : '🌛';
    localStorage.setItem(multiplicationConfig.darkModeKey, isCurrentlyDark);

    if (isCurrentlyDark) {
      createWordBackground();
    } else {
      const container = $('#word-background');
      if (container) {
        container.innerHTML = '';
      }
    }
  };

  $('#results-link').style.display = 'block';
  $('#results-link').onclick = () => {
    updateResultsUI(true);
  };
  $('#results-title').onclick = () => {
    updateResultsUI(false);
  };
  $('#title').ondblclick = () => {
    const overrides = prompt('Tables override list e.g. "2 x 2 = 4,3 x 2 = 6" (leave empty to clear!)', storedOverrides);
    if (overrides !== null) {
      if (overrides) {
        localStorage.setItem(overridesKey, overrides);
      }
      else {
        localStorage.removeItem(overridesKey);
      }
      location.reload();
    }
  };
  $('#rewards').onclick = () => {
    const redeem = confirm('Redeem all points?');
    if (redeem) {
      localStorage.setItem(multiplicationConfig.redeemedKey, rewardsTotal);
      location.reload();
    }
  };

  function updateResultsUI(showResults, hideTitle) {
    $('#results-title').style.display = showResults && !hideTitle ? 'block' : 'none';
    $('#results').style.display = showResults ? 'flex' : 'none';
    $('#results-link').style.display = showResults ? 'none' : 'block';
  }

  document.addEventListener("keyup", e => {
    if(e.key === 'Enter') {
      document.activeElement.blur();
    }
  });
}
