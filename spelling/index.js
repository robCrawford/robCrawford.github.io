(function() {
  const $ = selector => document.querySelector(selector);

  let completed = false;

  const config = {
    stateName: 'spelling-state',
    fieldCount: 10,
    completedCount: 5,
    hintCount: 5
  };

  const year2 = [
    'about', 'above', 'after', 'again', 'although', 'always', 'another', 'ask', 'asked', 'baby', 'because', 'before', 'behind', 'between', 'both', 'call', 'called', 'children', 'climb', 'could', 'different', 'even', 'ever', 'every', 'everyone', 'everything', 'father', 'finally', 'friends', 'great', 'help', 'hide', 'house', "i'm", 'know', 'large', 'last', 'little', 'looked', 'love', 'many', 'most', 'mother', 'Mr', 'Mrs', 'need', 'next', 'oh', 'once', 'only', 'other', 'our', 'over', 'people', 'please', 'really', 'school', 'should', 'small', 'suddenly', 'these', 'things', 'think', 'those', 'thought', 'thorough', 'time', 'together', 'under', 'until', 'very', 'where', 'which', 'work', 'would', 'year', 'young', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year3 = [
    'across', 'almost', 'along', 'animal', 'around', 'balloon', 'beautiful', 'began', 'being', 'below', 'better', 'birthday', 'break', 'brother', 'brought', 'change', 'child', 'Christmas', 'clothes', 'cold', 'coming', 'does', 'door', 'during', 'eyes', 'father', 'follow', 'found', 'garden', 'goes', 'gold', 'gone', 'grass', 'half', 'happy', 'head', 'high', 'hour', 'important', 'improve', 'inside', 'jumped', 'knew', 'lady', 'leave', 'light', 'might', 'mind', 'money', 'morning', 'move', 'much', 'near', 'never', 'number', 'opened', 'outside', 'own', 'paper', 'parents', 'place', 'pretty', 'prove', 'right', 'round', 'second', 'show', 'sister', 'something', 'sometimes', 'sound', 'started', 'still', 'stopped', 'such', 'sugar', 'sure', 'swimming', 'today', 'told', 'tries', 'turn', 'upon', 'used', 'walk', 'watch', 'water', 'while', 'white', 'whole', 'why', 'window', 'without', 'woke', 'woken', 'word', 'world', 'write', 'year', 'yellow'
  ];

  const year4 = [
    'accidentally', 'actually', 'occasionally', 'probably', 'knowledge', 'knowledgeable', 'words', 'mention', 'occasion', 'position', 'possession', 'question', 'possess', 'caught', 'naughty', 'eighth', 'reign', 'weight', 'height', 'therefore', 'famous', 'various', 'possible', 'enough', 'bicycle', 'business', 'disappear', 'disbelieve', 'rebuild', 'reposition', 'favourite', 'interest', 'library', 'ordinary', 'separate', 'address', 'appear', 'arrive', 'difficult', 'opposite', 'pressure', 'suppose', 'decide', 'describe', 'extreme', 'guide', 'surprise', 'earth', 'fruit', 'heart', 'history', 'increase', 'minute', 'natural', 'quarter', 'regular', 'material', 'experiment', 'length', 'center', 'century', 'certain', 'circle', 'exercise', 'experience', 'medicine', 'notice', 'recent', 'answer', 'breath', 'breathe', 'build', 'calendar', 'complete', 'consider', 'continue', 'early', 'group', 'guard', 'forwards', 'heard', 'imagine', 'island', 'learn', 'often', 'particular', 'peculiar', 'perhaps', 'popular', 'potatoes', 'promise', 'purpose', 'remember', 'centered', 'straight', 'strange', 'strength', 'woman', 'women'
  ];

  const allWords = [...year2, ...year3, ...year4];
  const spellingState = JSON.parse(localStorage.getItem(config.stateName) || '{}');
  const incompleteWords = allWords.filter(word => !((spellingState[word] || 0) >= config.completedCount));

  let shuffledWords = incompleteWords
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const words = shuffledWords.slice(0, config.fieldCount);

  if (!words.length) {
    $('#title').innerHTML = "Congratulations 😊 <div>You have learned every word!! 😊😊😊</div>";
  }

  const wordToId = word => word.replace(/[^\w]/g, '');

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
      const isCorrect = answer === word;
      if (input.value) {
        input.className = isCorrect ? 'correct' : 'incorrect';
        if (!isCorrect && word.toLowerCase() === answer) {
          const prevValue = input.value;
          setTimeout(() => { input.value = word; }, 500);
          setTimeout(() => { input.value = prevValue; }, 800);
        }
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
    `<div class="field"><input id="${
      wordToId(word)
    }" type="text" onfocus="speak('${
      word
    }')" onblur="updateResults()" /><span class="repeat" onclick="speak('${
      word
    }', true)">↻</span></div>`
  ).join('');

  const resultsHtml = Object.entries(spellingState).map(([word, count]) => `<div class="results-word"><h3>${word}</h3><span>${count}</span></div>`).join('');

  $('#form-fields').innerHTML = fieldsHtml;
  $('#results').innerHTML = resultsHtml;

  $('#results-link').onclick = () => {
    updateResultsUI(true);
  };
  $('#results-title').onclick = () => {
    updateResultsUI(false);
  };

  function updateResultsUI(showResults) {
    $('#results-title').style.display = showResults ? 'block' : 'none';
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

}());
