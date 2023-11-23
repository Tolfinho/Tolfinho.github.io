/*
 *   VARIABLES
 */
let modo = null;
let dificuldade = null;

/*
 *   COMPONENTS
 */
const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', (e) => showGamemodeForm(e));

const linkToGame = document.getElementById('linkToGame');
linkToGame.addEventListener('click', (e) => startGame(e));

const modoElement = document.getElementById('modo');
modoElement.addEventListener('change', (e) => (modo = e.target.value));

const dificuldadeElement = document.getElementById('dificuldade');
dificuldadeElement.addEventListener(
  'change',
  (e) => (dificuldade = e.target.value)
);

const gamemodeForm = document.getElementById('gamemodeForm');

function showGamemodeForm(e) {
  e.preventDefault();
  playBtn.classList.toggle('hide');
  gamemodeForm.classList.toggle('hide');
}

function startGame(e) {
  e.preventDefault();
  const a = document.createElement('a');
  a.href = `./pages/jogo.html?modo=${modo}&dificuldade=${dificuldade}`;
  a.click();
}
