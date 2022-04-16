import './sass/style.scss';
import Leaderboard from './modules/leaderboard.js';
import './assets/images/king-crown.svg';
import './assets/images/king.png';
import './assets/images/title.png';

// Declare and initialize empty ID that will hold our game ID from Local Storage
let id = '';

// Get game ID from Local Storage, if no game ID is created, create it!
window.onload = async () => {
  if (!localStorage.getItem('test')) {
    id = await Leaderboard.getGameID();
    localStorage.setItem('test', id);
  } else {
    id = localStorage.getItem('test');
    // Load all players with name: score format
    Leaderboard.load(id);
  }
};

// Get DOM elements to manipulate them
const name = document.querySelector('#name');
const score = document.querySelector('#score');

// Get form and add 'submit' EventListener
document.querySelector('#myForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const playerScore = new Leaderboard(name.value, score.value);
  Leaderboard.add(playerScore, id);
  name.value = '';
  score.value = '';
});

// Get refresh button and add 'click' EventListener
document.querySelector('.refresh-btn').addEventListener('click', () => {
  Leaderboard.load(id);
});