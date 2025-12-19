import { initMultiplication } from './multiplication/index.js';
import { createWordBackground } from './word-background.js';

window.scrollTo(0, 0);

window.$ = selector => document.querySelector(selector);

if (localStorage.getItem('spelling-dark-mode') === 'true') {
  createWordBackground();
}
initMultiplication();
