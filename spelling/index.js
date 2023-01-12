(function() {
  const $ = selector => document.querySelector(selector);
  window.scrollTo(0, 0);

  let completed = false;

  const config = {
    stateName: 'spelling-state',
    fieldCount: 10,
    completedWordCount: 5,
    hintCount: 5,
    completedFieldsReward: .5,
  };

  const helpHtml = `<p>Completing all ${config.fieldCount} words earns ${config.completedFieldsReward.toFixed(2)} points!</p><p>A word hint will be shown in the field if you need to click repeat ${config.hintCount} times.</p>`;

  // Entries here will be the only words tested
  let tempOverrideWords = [];

  // Double click page title to enter overrides into localStorage
  const overridesKey = `${config.stateName}-overrides`;
  const storedOverrides = (localStorage.getItem(overridesKey) || '').replace(/,\s*/g, '|').split('|').filter(Boolean);
  if (storedOverrides.length) {
    tempOverrideWords = storedOverrides;
  }

  const additionalWords = ["guitar", "guide", "guidebook", "guardian", "guess", "guest", "guarantee"];

  const year2 = [
    "about", "above", "after", "again", "although", "always", "another", "ask", "asked", "baby", "because", "before", "behind", "between", "both", "call", "called", "children", "climb", "could", "different", "even", "ever", "every", "everyone", "everything", "father", "finally", "friends", "great", "help", "hide", "house", "know", "large", "last", "little", "looked", "love", "many", "most", "mother", "Mr", "Mrs", "need", "next", "oh", "once", "only", "other", "our", "over", "people", "please", "really", "school", "should", "small", "suddenly", "these", "things", "think", "those", "thought", "thorough", "time", "together", "under", "until", "very", "where", "which", "work", "would", "year", "young", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  const year3 = [
    "across", "almost", "along", "animal", "around", "balloon", "beautiful", "began", "being", "below", "better", "birthday", "break", "brother", "brought", "change", "child", "Christmas", "clothes", "cold", "coming", "does", "door", "during", "eyes", "father", "follow", "found", "garden", "goes", "gold", "gone", "grass", "half", "happy", "head", "high", "hour", "important", "improve", "inside", "jumped", "knew", "lady", "leave", "light", "might", "mind", "money", "morning", "move", "much", "near", "never", "number", "opened", "outside", "own", "paper", "parents", "place", "pretty", "prove", "right", "round", "second", "show", "sister", "something", "sometimes", "sound", "started", "still", "stopped", "such", "sugar", "sure", "swimming", "today", "told", "tries", "turn", "upon", "used", "walk", "watch", "water", "while", "white", "whole", "why", "window", "without", "woke", "woken", "word", "world", "write", "year", "yellow"
  ];

  const year4 = [
    "accidentally", "actually", "occasionally", "probably", "knowledge", "knowledgeable", "words", "mention", "occasion", "position", "possession", "question", "possess", "caught", "naughty", "eighth", "reign", "weight", "height", "therefore", "famous", "various", "possible", "enough", "bicycle", "business", "disappear", "disbelieve", "rebuild", "reposition", "favourite", "interest", "library", "ordinary", "separate", "address", "appear", "arrive", "difficult", "opposite", "pressure", "suppose", "decide", "describe", "extreme", "guide", "surprise", "earth", "fruit", "heart", "history", "increase", "minute", "natural", "quarter", "regular", "material", "experiment", "length", "center", "century", "certain", "circle", "exercise", "experience", "medicine", "notice", "recent", "answer", "breath", "breathe", "build", "calendar", "complete", "consider", "continue", "early", "group", "guard", "forwards", "heard", "imagine", "island", "learn", "often", "particular", "peculiar", "perhaps", "popular", "potatoes", "promise", "purpose", "remember", "centered", "straight", "strange", "strength", "woman", "women"
  ];

  // Words
  const allWords = deduplicate(tempOverrideWords.length ? tempOverrideWords : [...year2, ...year3, ...year4, ...additionalWords]);
  const spellingState = JSON.parse(localStorage.getItem(config.stateName) || '{}');
  const incompleteWords = allWords.filter(word => !((spellingState[word] || 0) >= config.completedWordCount));

  // Rewards
  const completedFieldsCount = Object.values(spellingState).reduce((acc, count) => acc + count, 0) / config.fieldCount;
  const rewardAmount = `🌟 ${(round(completedFieldsCount * config.completedFieldsReward, config.completedFieldsReward)).toFixed(2)}`;

  let shuffledWords = incompleteWords
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const words = shuffledWords.slice(0, config.fieldCount);

  if (!words.length) {
    $('#title').innerHTML = "Congratulations!<div class='complete-message'>You have learned every word 😊😊😊</div>";
    $('#rewards').style.top = 0;
    $('#help-icon').style.display = 'none';
    updateResultsUI(true, true);
  }

  const wordToId = word => `_${word.replace(/[^\w]/g, '')}_`;

  window.speak = (word, isRepeat) => {
    if ('speechSynthesis' in window) {
      var msg = new SpeechSynthesisUtterance();
      msg.text = word;
      window.speechSynthesis.speak(msg);

      if (isRepeat) {
        const fnHandle = window.speak;
        const countEntry = fnHandle[word];
        fnHandle[word] = (countEntry || 1) + 1;

        if (countEntry >= config.hintCount) {
          fnHandle[word] = 0;
          const input = $(`#${wordToId(word)}`);
          input.value = '';
          setTimeout(() => { input.value = word }, 500);
          setTimeout(() => { input.value = '' }, 800);
        }
      }
    } else {
      alert("Sorry, your browser doesn't support speech synthesis!");
    }
  }

  window.clearComplete = () => {
    setTimeout(() => { location.reload(); }, 1000);
  }

  window.updateResults = () => {
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
      localStorage.setItem(config.stateName, JSON.stringify(spellingState));

      $('#complete-overlay').style.display = 'block';
      window.speak("Awesome job! Wop wop wop wop wop wop wop wop wop wop wop wop");
      setTimeout(clearComplete, 5000);
    }
  }

  const fieldsHtml = words.map((word, i) =>
    `<div class="field"><input id="${wordToId(word)}" type="text" autocorrect="off" autocapitalize="off" /><span title="repeat" class="repeat">↻</span></div>`
  ).join('');

  setTimeout(() => {
    words.forEach((word) => {
      const fieldEl = $(`#${wordToId(word)}`);
      fieldEl.onfocus = () => speak(word);
      fieldEl.onblur = () => updateResults();

      const repeatEl = $(`#${wordToId(word)} + .repeat`);
      repeatEl.onclick = () => speak(word, true);
    });
  });

  const resultsHtml = Object.entries(spellingState).map(([word, count]) => `<div class="results-word${count >= config.completedWordCount ? ' completed-word' : ''}"><h3>${word}</h3><span>${count}</span></div>`).join('');

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
    const overrides = prompt('Words override list (comma separated, leave empty to clear!)');
    if (overrides) {
      localStorage.setItem(overridesKey, overrides);
    }
    else {
      localStorage.removeItem(overridesKey);
    }
    location.reload();
  }

  function updateResultsUI(showResults, hideTitle) {
    $('#results-title').style.display = showResults && !hideTitle ? 'block' : 'none';
    $('#results').style.display = showResults ? 'flex' : 'none';
    $('#results-link').style.display = showResults ? 'none' : 'block';
  }

  // Listeners
  document.addEventListener("keyup", e => {
    if(e.key === 'Enter') {
      document.activeElement.blur();
    }
  });

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  // Utils
  function deduplicate(array) {
    return [...new Set(array)];
  }

  function round(value, step = 1) {
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  }

}());
