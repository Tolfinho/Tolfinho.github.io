window.addEventListener('load', (e) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const score = urlParams.get('score');

  const scoreDiv = document.getElementById('matchScore');
  scoreDiv.innerHTML = `Pontuação: ${score}`;

  let highscore = localStorage.getItem('highscore');

  if (highscore === null || score > highscore) {
    localStorage.setItem('highscore', score);
    highscore = score;
  }

  const highscoreDiv = document.getElementById('highScore');
  highscoreDiv.innerHTML = `Recorde: ${highscore}`;
});
