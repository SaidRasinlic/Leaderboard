// Create class and add parameterized constructor
export default class Leaderboard {
  constructor(user, score) {
    this.user = user;
    this.score = score;
  }

  // Get ul from plain html to dynamically manipulate it
  static list = document.getElementById('scores-list');

  // Get game ID and cut the extra text with regex matcher (we only need ID)
  static getGameID = async () => {
    const namedId = await this.createGame();
    console.log(nameId);
    const reGex = /(?<=Game with ID: ).+(?= )/gi;
    const id = namedId.result.match(reGex)[0];
    return id;
  };

  // Create game with new name and send request to the following URL to load data
  static createGame = async () => {
    const requestURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/OF1KU91gWCdUZlF7oiDJ';
    const result = await fetch(`${requestURL}/games/`, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Catch the Bugs',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json());
    return result;
  };

  // Consuming JavaScript Fetch API, sending data to a server with async & await function
  static add = async (scoreData, id) => {
    const requestURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores/`;
    document.querySelector('.submit-btn');
    if (scoreData.user !== '') {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(scoreData),
      };
      await fetch(requestURL, requestOptions);
    }
    this.load(id);
  }

  // Consuming JavaScript Fetch API, receiving data from a server with async & await function
  static load = async (id) => {
    const requestURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores/`;
    let scores = '';
    this.list.innerHTML = '';
    if (navigator.onLine) {
      const request = await fetch(requestURL, { method: 'GET' });
      const { result } = await request.json();
      if (result.length) {
        result.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)).forEach((score) => {
          scores += `
          <li>${score.user}:  ${score.score}</li>
        `;
        });
        this.list.innerHTML = scores;
      } else {
        this.list.innerHTML += `
        <li class="no-score">List is empty, please add a player.</li>
      `;
      }
    }
  }
}
