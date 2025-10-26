import { spellingConfig } from './spelling/index.js';
import { multiplicationConfig } from './multiplication/index.js';

export function deduplicate(array) {
  return [...new Set(array)];
}

export function round(value, step = 1) {
  const inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

export function wordToId(word) {
  return `_${word.replace(/[^\w]/g, '')}_`;
}

export function sentenceToId(sentence) {
  return `_${sentence.replace(/[^\w]/g, '')}_`;
}

export function clearComplete() {
  setTimeout(() => { location.reload(); }, 1000);
}

export function speak(word, isRepeat) {
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = word;
    window.speechSynthesis.speak(msg);

    if (isRepeat) {
      const fnHandle = speak;
      const wordId = wordToId(word);
      let repeatCount = (fnHandle[wordId] || 0) + 1;

      if (repeatCount >= spellingConfig.hintCount) {
        repeatCount = 0;
        const input = $(`#${wordId}`);
        input.value = word;
        setTimeout(() => { input.value = '' }, 200);
      }

      fnHandle[wordId] = repeatCount;
    }
  } else {
    alert("Sorry, your browser doesn't support speech synthesis!");
  }
}

export const pluralise = (word) => `${word}${word === 'six' ? 'es' : 's'}`;

window.promptReset = (page) => {
  if (window.confirm('Clear saved form fields?')) {
    if (page === 'spelling') {
      localStorage.removeItem(spellingConfig.uiStateKey);
    } else {
      localStorage.removeItem(multiplicationConfig.uiStateKey);
    }
    location.reload();
  }
};
