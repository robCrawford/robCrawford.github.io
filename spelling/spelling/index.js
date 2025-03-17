import { deduplicate, round, speak, wordToId, clearComplete } from '../utils.js';
import data from './data.js';

export const spellingConfig = {
  stateName: 'spelling-state',
  fieldCount: 8,
  completedWordCount: 10,
  hintCount: 1,
  completedFieldsReward: 0.2,
  rewardsKey: 'spelling-rewards',
  redeemedKey: 'spelling-redeemed'
};

// Entries here will be the only words tested
// NOTE: update fieldCount for rewards calculation!
let tempOverrideWords = ['after','again','any','bath','beautiful','because','behind','both'];

// Clear local storage prior to latest key
// NOTE: changing this removes all previous data from the browser!
const validDataSetKey = 'spelling-01-2025';
if (!localStorage.getItem(validDataSetKey)) {
  localStorage.clear();
  localStorage.setItem(validDataSetKey, true);
}

const helpHtml = `<p>Completing all ${spellingConfig.fieldCount} words earns ${spellingConfig.completedFieldsReward.toFixed(2)} points!</p><p>A word hint will be shown in the field if the repeat icon is clicked${spellingConfig.hintCount > 1 ? `  ${spellingConfig.hintCount} times` : '' }.</p>`;

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
    ...data.year1,
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
  const rewardsText = `🌟 ${(rewardsDisplayAmount).toFixed(2)}`;

  let shuffledWords = incompleteWords
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const words = shuffledWords.slice(0, spellingConfig.fieldCount);

  if (!words.length) {
    $('#title').innerHTML = "Congratulations!<div class='complete-message'>You have learned every word 😊😊😊</div>";
    $('#rewards').style.top = 0;
    $('#help-icon').style.display = 'none';
    updateResultsUI(true, true);
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
      })
      localStorage.setItem(spellingConfig.stateName, JSON.stringify(spellingState));
      localStorage.setItem(spellingConfig.rewardsKey, round(rewardsTotal + spellingConfig.completedFieldsReward, spellingConfig.completedFieldsReward));

      $('#complete-overlay').style.display = 'block';
      speak("Awesome job! You are rocking it! Go go go");
      setTimeout(clearComplete, 3500);
    }
  }

  const fieldsHtml = words.map((word, i) =>
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
      fieldEl.onfocus = () => speak(word);
      fieldEl.onblur = () => updateResults();

      const repeatEl = $(`#${wordToId(word)} + .repeat`);
      repeatEl.onclick = () => speak(word, true);
    });
    $('#help-icon').ontouchend = () => {
      $('.tooltip .balloon').classList.toggle('show');
    };

    // Retest word
    Object.keys(spellingState).forEach((word) => {
      const resultEl = $(`#result-${wordToId(word)}`);
      resultEl.ondblclick = () => {
        if (confirm(`Retest "${word}"?`)) {
          spellingState[`${word}~${Date.now()}`] = spellingState[word];
          delete spellingState[word];
          localStorage.setItem(spellingConfig.stateName, JSON.stringify(spellingState));
          location.reload();
        }
      }
    });
  });

  $('#form-fields').innerHTML = fieldsHtml;
  $('#results').innerHTML = resultsHtml;
  $('#rewards').innerHTML = rewardsText;
  $('#help-text').innerHTML = helpHtml;
  $('#results-link').onclick = () => {
    updateResultsUI(true);
  };
  $('#results-title').onclick = () => {
    updateResultsUI(false);
  };
  $('#title').ondblclick = () => {
    const overrides = prompt('Words override list (comma separated, leave empty to clear!)', storedOverrides);
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

  $('#rewards').ondblclick = () => {
    const redeem = confirm('Redeem all points?');
    if (redeem) {
      localStorage.setItem(spellingConfig.redeemedKey, redeemedAmount + rewardsTotal);
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
}
