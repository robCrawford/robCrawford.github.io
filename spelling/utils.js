import { spellingConfig } from './spelling/index.js';

export function deduplicate(array) {
  return [...new Set(array)];
}

export function round(value, step = 1) {
  var inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

export function wordToId(word) {
  return `_${word.replace(/[^\w]/g, '')}_`;
}

export function clearComplete() {
  setTimeout(() => { location.reload(); }, 1000);
}

export function speak(word, isRepeat) {
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = word;
    window.speechSynthesis.speak(msg);

    if (isRepeat) {
      const fnHandle = speak;
      const countEntry = fnHandle[word];
      fnHandle[word] = (countEntry || 1) + 1;

      if (countEntry >= spellingConfig.hintCount) {
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
