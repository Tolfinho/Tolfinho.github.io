const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const image = new Image();
image.src = '../assets/img/gameBackground.jpg';
c.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//c.fillStyle = 'black';
//c.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

// Variables
let balls = [];
let score = 0;
let lifes = 5;
let muted = false;
let ballSpawnSpeed = null;

const aim = document.getElementById('aim');

// Classes
class Ball {
  static posX;
  static posY;
  static width;
  static height;

  constructor(position, radius) {
    this.posX = position.x;
    this.posY = position.y;
    this.radius = radius;
  }

  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.posX, this.posY, this.radius, this.radius);
  }

  update() {
    this.draw();
  }
}

window.addEventListener('load', (e) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const dificuldade = urlParams.get('dificuldade');

  switch (dificuldade) {
    case 'facil':
      ballSpawnSpeed = 800;
      console.log('facil');
      break;
    case 'medio':
      ballSpawnSpeed = 500;
      console.log('medio');
      break;
    case 'dificil':
      ballSpawnSpeed = 350;
      console.log('dificil');
      break;
    case 'ranked':
      ballSpawnSpeed = 350;
      console.log('ranked');
      break;
    default:
      console.log('none');
      break;
  }

  // prevents unwanted renders
  if (ballSpawnSpeed !== null) {
    initGame();
  }
});
function initGame() {
  animate();
  generateBall();
}

// Game Loop
function animate() {
  // Screen clean
  //c.fillStyle = 'black';
  //c.fillRect(0, 0, canvas.width, canvas.height);

  c.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (balls.length > 0) {
    balls.map((ball) => {
      ball.update();
    });
  }

  renderGameUI();

  window.requestAnimationFrame(animate);
}

function generateBall() {
  let interval = setInterval(() => {
    let validPosition = false;
    var x = Math.floor(Math.random() * (canvas.width - 100));
    var y = Math.floor(Math.random() * (canvas.height - 100));

    const newBall = new Ball({ x: x, y: y }, 100);
    balls.push(newBall);

    if (balls.length >= 5) {
      endGame();
    }
  }, ballSpawnSpeed);
}

function checkBallClick(e) {
  var aux = false;

  balls.map((ball, index) => {
    if (
      e.offsetX >= ball.posX &&
      e.offsetX <= ball.posX + ball.radius &&
      e.offsetY >= ball.posY &&
      e.offsetY <= ball.posY + ball.radius
    ) {
      // you are clicking some target

      // kill target
      balls.splice(index, 1);

      aux = true;
    }
  });

  return aux;
}

canvas.addEventListener('mousedown', (e) => {
  // console.log(checkBallClick(e));
  if (checkBallClick(e)) {
    //user +1 points
    score = score + 10;
    if (muted === false) {
      playAudio('success');
    }
  } else {
    lifes = lifes - 1;
    if (muted === false) {
      playAudio('missed');
    }

    // check end game
    if (lifes <= 0) {
      endGame();
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  aim.style.left = e.offsetX + 'px';
  aim.style.top = e.offsetY + 'px';
});

function renderGameUI() {
  const scoreDiv = document.getElementById('score');
  const lifesDiv = document.getElementById('lifes');

  scoreDiv.innerHTML = `Pontuação: ${score}`;
  lifesDiv.innerHTML = `Vidas: ${lifes}`;
}

function playAudio(type) {
  var audio = new Audio();

  if (type === 'success') {
    audio.src = '../assets/audios/shoot.wav';
    audio.play();
  } else if (type === 'missed') {
    audio.src = '../assets/audios/wrong.wav';
    audio.volume = 0.2;
    audio.play();
  }
}

function endGame() {
  const a = document.createElement('a');
  a.href = `../pages/matchReview.html?score=${score}`;
  a.click();
}
