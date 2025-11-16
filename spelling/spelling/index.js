import { deduplicate, round, speak, wordToId, clearComplete } from '../utils.js';
import data from './data.js';

export const spellingConfig = {
  stateName: 'spelling-state',
  fieldCount: 5,
  completedWordCount: 1200, // How many times to test each word
  hintCount: 1,
  completedFieldsReward: 50,
  rewardsKey: 'spelling-rewards',
  redeemedKey: 'spelling-redeemed',
  nameKey: 'spelling-name',
  uiStateKey: 'spelling-ui-state'
};

let name = '';

// Entries here will be the only words tested
// NOTE: update fieldCount for rewards calculation!
let tempOverrideWords = ['was', 'they', 'on', 'you', 'she'];

// Clear local storage prior to latest key
// NOTE: changing this removes all previous data from the browser!
const validDataSetKey = 'spelling-10-2025';
if (!localStorage.getItem(validDataSetKey)) {
  localStorage.clear();
  localStorage.setItem(validDataSetKey, true);
}

const helpHtml = `<p>Completing all ${spellingConfig.fieldCount} words earns ${spellingConfig.completedFieldsReward} points!</p><p>A word hint will be shown in the field if the repeat icon is clicked${spellingConfig.hintCount > 1 ? `  ${spellingConfig.hintCount} times` : '' }.</p>`;

export function initSpelling() {
  let completed = false;

  // Double click page title to enter overrides into localStorage
  const overridesKey = `${spellingConfig.stateName}-overrides`;
  const storedOverrides = (localStorage.getItem(overridesKey) || '').replace(/,\s*/g, '|').split('|').filter(Boolean);
  if (storedOverrides.length) {
    tempOverrideWords = storedOverrides;
  }

  // Words
  const allWords = deduplicate(tempOverrideWords.length ? tempOverrideWords : [
    ...data.year3,
    ...data.year4,
  ]);
  const spellingState = JSON.parse(localStorage.getItem(spellingConfig.stateName) || '{}');
  const incompleteWords = allWords.filter(word => !((spellingState[word] || 0) >= spellingConfig.completedWordCount));

  // Rewards
  const rewardsTotal = JSON.parse(localStorage.getItem(spellingConfig.rewardsKey) || 0);
  const redeemedAmount = JSON.parse(localStorage.getItem(spellingConfig.redeemedKey) || 0);
  let rewardsDisplayAmount = rewardsTotal - redeemedAmount;

  // Ensure rewardsTotal is not negative
  if (rewardsDisplayAmount < 0) {
    localStorage.setItem(spellingConfig.redeemedKey, rewardsTotal);
    rewardsDisplayAmount = 0;
  }
  const rewardsText = `🌟 ${rewardsDisplayAmount}`;

  // Check for saved state to restore the same words
  const savedUiState = JSON.parse(localStorage.getItem(spellingConfig.uiStateKey) || '{}');
  const savedUiStateWords = savedUiState.words || [];
  const savedUiStateValues = savedUiState.values || {};

  let words;
  if (savedUiStateWords.length > 0 && savedUiStateWords.every(word => incompleteWords.includes(word))) {
    // Restore the same words if there's saved progress
    words = savedUiStateWords;
  } else {
    // Generate new shuffled words
    let shuffledWords = incompleteWords
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    words = shuffledWords.slice(0, spellingConfig.fieldCount);

    // Clear any stale UI state data
    localStorage.removeItem(spellingConfig.uiStateKey);
  }

  if (!words.length) {
    $('#title').innerHTML = "Congratulations!<div class='complete-message'>You have learned every word 😊😊😊</div>";
    $('#rewards').style.top = 0;
    $('#help-icon').style.display = 'none';
    updateResultsUI(true, true);
  }

  // Name
  name = localStorage.getItem(spellingConfig.nameKey) || '';
  if (name) {
    $('#title').innerHTML = `Hi, ${name}!`;
    $('#title').onclick = () => {
      if (confirm('reset name?')) {
        localStorage.removeItem(spellingConfig.nameKey);
        window.location.reload();
      }
    };
  }
  else {
    // Dont run for @media only screen and (max-width: 630px) {
    if (!window.matchMedia('(max-width: 630px)').matches) {
      $('#title').innerHTML = `<input id="name-input" type="text" class="pulse-border" placeholder="Enter your name!" />`;
      $('#name-input').focus();

      const saveName = () => {
        const inputValue = $('#name-input').value.trim();
        if (inputValue) {
          const nameCased = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
          localStorage.setItem(spellingConfig.nameKey, nameCased);
          window.location.reload();
        }
      };

      $('#name-input').onkeydown = (e) => {
        if (e.key === 'Enter') {
          saveName();
        }
      };

      $('#name-input').onblur = () => {
        saveName();
      };
    }
  }
  $('#help-icon').style.display = 'inline-block';

  if (tempOverrideWords.length) {
    $('#title').setAttribute('title', 'Today\'s words: ' + tempOverrideWords.join(', '));
  }

  function updateResults() {
    const isComplete = words.reduce((allCorrect, word) => {
      const input = $(`#${wordToId(word)}`);
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
      words.forEach(word => {
        spellingState[word] = (spellingState[word] || 0) + 1;
      });
      localStorage.setItem(spellingConfig.stateName, JSON.stringify(spellingState));
      localStorage.setItem(spellingConfig.rewardsKey, round(rewardsTotal + spellingConfig.completedFieldsReward, spellingConfig.completedFieldsReward));
      // Clear saved UI state
      localStorage.removeItem(spellingConfig.uiStateKey);

      $('#complete-overlay').style.left = 0;
      $('#complete-overlay').style.right = 0;
      speak(`Awesome job ${name}! You are rocking it! Go go go`);
      setTimeout(() => {
        clearComplete();
      }, 3500);
    }
  }

  const fieldsHtml = words.map((word) =>
    `<div class="field"><input id="${wordToId(word)}" type="text" autocorrect="off" autocapitalize="off" /><span title="repeat" class="repeat">↻</span></div>`
  ).join('');

  const resultsHtml = Object.entries(spellingState).map(([word, count]) => {
    const displayWord = /~/.test(word) ? `<s>${word.split('~')[0]}</s>` : word;
    return `<div class="results-word${count >= spellingConfig.completedWordCount ? ' completed-word' : ''}"><h3 id="result-${wordToId(word)}">${displayWord}</h3><span>${count}</span></div>`
  }).join('');

  // DOM elements
  setTimeout(() => {
    words.forEach((word) => {
      const fieldEl = $(`#${wordToId(word)}`);

      // Restore saved value if available
      if (savedUiStateValues[word]) {
        fieldEl.value = savedUiStateValues[word];
        updateResults();
      }

      fieldEl.onfocus = () => speak(word);
      fieldEl.onblur = () => {
        // Save UI state to localStorage with all words and their current values (only if not completed)
        if (!completed) {
          const uiState = JSON.parse(localStorage.getItem(spellingConfig.uiStateKey) || '{}');
          const values = uiState.values || {};
          values[word] = fieldEl.value;

          localStorage.setItem(spellingConfig.uiStateKey, JSON.stringify({
            words: words,
            values: values
          }));
        }

        updateResults();
      };

      const repeatEl = $(`#${wordToId(word)} + .repeat`);
      repeatEl.onclick = () => speak(word, true);
    });
    $('#help-icon').onclick = () => {
      $('.tooltip .balloon').classList.toggle('show');
    };

    // Retest word
    Object.keys(spellingState).forEach((word) => {
      const resultEl = $(`#result-${wordToId(word)}`);
      if (resultEl) {
        resultEl.ondblclick = () => {
          if (confirm(`Reset "${word}"?`)) {
            spellingState[`${word}~${Date.now()}`] = spellingState[word];
            delete spellingState[word];
            localStorage.setItem(spellingConfig.stateName, JSON.stringify(spellingState));
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
  $('#results-link').style.display = 'block';
  $('#results-link').onclick = () => {
    updateResultsUI(true);
  };
  $('#results-title').onclick = () => {
    updateResultsUI(false);
  };
  $('#help-icon').ondblclick = () => {
    const overrides = prompt('Words override list (comma separated, leave empty to clear!)', storedOverrides);
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
      localStorage.setItem(spellingConfig.redeemedKey, rewardsTotal);
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

