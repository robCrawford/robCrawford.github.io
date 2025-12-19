import { deduplicate } from './utils.js';
import data from './spelling/data.js';

export function createWordBackground() {
  const allWords = deduplicate([
    ...data.year1,
    ...data.year2,
    ...data.year3,
    ...data.year4,
    ...data.year5_6
  ]);

  const container = document.getElementById('word-background');
  if (!container) {
    console.log('Word background container not found');
    return;
  }

  const wordsToRender = 150;

  for (let i = 0; i < wordsToRender; i++) {
    const word = allWords[i % allWords.length];
    const wordEl = document.createElement('div');
    wordEl.className = 'bg-word';
    wordEl.textContent = word;

    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const fontSize = 20 + Math.random() * 60;
    const rotation = -15 + Math.random() * 30;
    const opacity = 0.05 + Math.random() * 0.1;
    const animationDelay = Math.random() * 20;

    wordEl.style.left = `${left}%`;
    wordEl.style.top = `${top}%`;
    wordEl.style.fontSize = `${fontSize}px`;
    wordEl.style.setProperty('--rotation', `${rotation}deg`);
    wordEl.style.transform = `rotate(${rotation}deg)`;
    wordEl.style.opacity = opacity.toString();
    wordEl.style.animationDelay = `${animationDelay}s`;

    container.appendChild(wordEl);
  }
}

