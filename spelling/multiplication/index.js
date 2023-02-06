import { deduplicate, round, speak, sentenceToId, clearComplete, pluralise } from '../utils.js';
import data, { numberWords } from './data.js';

export const multiplicationConfig = {
  stateName: 'multiplication-state',
  testCount: 20,
  completedTestCount: 12,
  completedTestReward: .5,
};

// Entries here will be the only tables tested e.g. ["2 x 2 = 4", "3 x 2 = 6"]
let tempOverrideTables = [];

const helpHtml = `<p>Completing all ${multiplicationConfig.testCount} tests earns ${multiplicationConfig.completedTestReward.toFixed(2)} points!</p>`;

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
  const completeTablesCount = Object.values(multiplicationState).reduce((acc, count) => acc + count, 0) / multiplicationConfig.testCount;
  const rewardAmount = `🌟 ${(round(completeTablesCount * multiplicationConfig.completedTestReward, multiplicationConfig.completedTestReward)).toFixed(2)}`;

  let shuffledTables = incompleteTables
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const tables = shuffledTables.slice(0, multiplicationConfig.testCount);

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
      })
      localStorage.setItem(multiplicationConfig.stateName, JSON.stringify(multiplicationState));

      setTimeout(() => {
        $('#complete-overlay').style.display = 'block';
        speak("Awesome job! Wop wop wop wop wop wop wop wop wop wop wop wop");
        setTimeout(clearComplete, 4600);
      }, 3000);
    }
  }

  const getNumberUI = (sentenceId) => {
    let ui = '<div class="number-buttons">';
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((i) => {
      ui += `<div class="number-button paused" id="${sentenceId}-${i}">${i}</div>`;
    });
    return `${ui}</div>`;
  }

  const fieldsHtml = tables.map((sentence, i) => {
    const sentenceId = sentenceToId(sentence);
    return `<div class="field"><input id="${sentenceId}" class="paused" type="text" autocorrect="off" autocapitalize="off" readonly /><span title="repeat" class="repeat">↻</span>${getNumberUI(sentenceId)}</div>`;
  }).join('');;

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
      }

      const repeatEl = $(`#${sentenceId} ~ .repeat`);
      repeatEl.onclick = () => {
        clearInput();
        input.focus();
        input.blur();
      }

      const handleIncorrect = () => {
        speak('yowser');
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
            }
            else {
              handleIncorrect();
            }
          }
        }
      }
    });
    $('#help-icon').ontouchend = () => {
      $('.tooltip .balloon').classList.toggle('show');
    };

    // Retest sentence
    Object.keys(multiplicationState).forEach((word) => {
      const resultEl = $(`#result-${sentenceToId(word)}`);
      resultEl.ondblclick = () => {
        if (confirm(`Retest "${word}"?`)) {
          multiplicationState[`${word}~${Date.now()}`] = multiplicationState[word];
          delete multiplicationState[word];
          localStorage.setItem(multiplicationConfig.stateName, JSON.stringify(multiplicationState));
          location.reload();
        }
      }
    });
  });

  $('#form-fields').innerHTML = fieldsHtml;
  $('#results').innerHTML = resultsHtml;
  $('#rewards').innerHTML = rewardAmount;
  $('#help-text').innerHTML = helpHtml;
  $('#results-link').onclick = () => {
    updateResultsUI(true);
  };
  $('#results-title').onclick = () => {
    updateResultsUI(false);
  };
  $('#title').ondblclick = () => {
    const overrides = prompt('Tables override list e.g. "2 x 2 = 4,3 x 2 = 6" (leave empty to clear!)', storedOverrides);
    if (overrides !== null) { // Cancel
      if (overrides) {
        localStorage.setItem(overridesKey, overrides);
      }
      else {
        localStorage.removeItem(overridesKey);
      }
      location.reload();
    }
  }

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

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
}
