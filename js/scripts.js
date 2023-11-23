const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 700;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const image = new Image();
image.src = '../img/gameBackground2.png';
c.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//c.fillStyle = 'black';
//c.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

// Variables
let balls = [];
let score = 0;
let lifes = 5;

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
  initGame();
});
function initGame() {
  animate();
}

// Game Loop
function animate() {
  // Screen clean
  //c.fillStyle = 'black';
  //c.fillRect(0, 0, canvas.width, canvas.height);

  c.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  balls.map((ball) => {
    ball.update();
  });

  renderGameUI();

  window.requestAnimationFrame(animate);
}

function generateBall() {
  let interval = setInterval(() => {
    let x = Math.floor(Math.random() * (canvas.width - 100));
    let y = Math.floor(Math.random() * (canvas.height - 100));

    const newBall = new Ball({ x: x, y: y }, 100);
    balls.push(newBall);

    if (balls.length >= 5) {
      endGame();
    }
  }, 350);
}
generateBall();

function checkBallClick(e) {
  var aux = false;

  console.log(e);

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

canvas.addEventListener('click', (e) => {
  // console.log(checkBallClick(e));
  if (checkBallClick(e)) {
    //user +1 points
    score = score + 10;
  } else {
    lifes = lifes - 1;
    // check end game
    if (lifes <= 0) {
      endGame();
    }
  }
});

function renderGameUI() {
  const scoreDiv = document.getElementById('score');
  const lifesDiv = document.getElementById('lifes');

  scoreDiv.innerHTML = `Pontuação: ${score}`;
  lifesDiv.innerHTML = `Vidas: ${lifes}`;
}

function endGame() {
  const a = document.createElement('a');
  a.href = `../pages/matchReview.html?score=${score}`;
  a.click();
}
