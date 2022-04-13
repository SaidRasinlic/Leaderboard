import './sass/style.scss';

const scoresList = document.getElementById('scores-list');

const myScoreList = [
  { id: 0, name: 'James', score: 340 },
  { id: 1, name: 'Elizabeth', score: 243 },
  { id: 2, name: 'Rock', score: 324 },
  { id: 3, name: 'Johnny', score: 643 },
  { id: 4, name: 'Said', score: 983 },
  { id: 5, name: 'Senad', score: 432 },
  { id: 6, name: 'Lamija', score: 565 },
  { id: 4, name: 'Emir', score: 547 },
  { id: 4, name: 'George', score: 936 },
];

myScoreList.forEach((data) => {
  myScoreList.sort((a, b) => a.index - b.index);
  scoresList.innerHTML += `
  <li id="${data.id}"><p class="data">${data.name}: ${data.score}</p>
  </li>
`;
});