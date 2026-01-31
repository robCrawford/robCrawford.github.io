import { initMultiplication } from './multiplication/index.js';
import { createWordBackground } from './word-background.js';
import { createStarBackground } from './star-background.js';

window.scrollTo(0, 0);

window.$ = selector => document.querySelector(selector);

const backgroundMode = localStorage.getItem('spelling-background-mode') || 'default';
if (backgroundMode === 'words') {
  createWordBackground();
} else if (backgroundMode === 'stars') {
  createStarBackground();
}
initMultiplication();
