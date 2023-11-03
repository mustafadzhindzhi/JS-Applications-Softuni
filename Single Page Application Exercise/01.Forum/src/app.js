import { showPost } from './post.js';

document.querySelector('nav a').addEventListener('click', (event) => {
  event.preventDefault();
  showPost();
});

document.querySelector('main').replaceChildren();
showPost();