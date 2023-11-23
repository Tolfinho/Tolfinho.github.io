window.addEventListener('load', (e) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const score = parseInt(urlParams.get('score'));

  const scoreDiv = document.getElementById('matchScore');
  scoreDiv.innerHTML = `Pontuação: ${score}`;

  let highscore = localStorage.getItem('highscore');

  if (highscore === null || score > parseInt(highscore)) {
    localStorage.setItem('highscore', score);
    highscore = score;
  }

  //console.log('Score -> ' + score);
  //console.log('Recorde -> ' + highscore);

  const highscoreDiv = document.getElementById('highScore');
  highscoreDiv.innerHTML = `Recorde: ${highscore}`;
});
