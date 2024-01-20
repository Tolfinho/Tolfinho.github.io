console.log('Hello World from Tetris!!!!!!');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 420;
canvas.height = 600;

// Classes
class InputHandler {
  constructor(game) {
    this.game = game;

    document.addEventListener('keydown', (e) => {
      console.log(e.key);
      if (
        (e.key === 'ArrowLeft' || e.key === 'a') &&
        this.game.isFree('left')
      ) {
        this.game.currentPiece.x -= this.game.squareWidth;
      } else if (
        (e.key === 'ArrowRight' || e.key === 'd') &&
        this.game.isFree('right')
      ) {
        this.game.currentPiece.x += this.game.squareWidth;
      } else if (
        (e.key === 'ArrowDown' || e.key === 's') &&
        this.game.isFree('down')
      ) {
        this.game.currentPiece.y += this.game.squareHeight;
      } else if (e.key === 'ArrowUp' || e.key === 'w') {
        this.game.currentPiece.matrixToRight();
      }
    });
  }
}

class Area {
  constructor(game) {
    this.game = game;
    this.squares = [];
  }

  draw(context) {
    //console.log(this.squares);
    if (this.squares.length) {
      this.squares.forEach((square) => {
        context.drawImage(
          square.image,
          square.x,
          square.y,
          this.game.squareWidth,
          this.game.squareHeight
        );
      });
    }
  }
}

class Piece {
  constructor(game, type) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.matrix = [];
    this.squares = [];
    this.moving = true;
    this.image = new Image();

    switch (type) {
      case 0:
        this.image.src = './assets/yellow-block.png';
        this.matrix = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        break;
      case 1:
        this.image.src = './assets/light-orange-block.png';
        this.matrix = [
          [0, 0, 1],
          [1, 1, 1],
          [0, 0, 0],
        ];
        break;
      case 2:
        this.image.src = './assets/light-orange-block.png';
        this.matrix = [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 0],
        ];
        break;
      case 3:
        this.image.src = './assets/green-block.png';
        this.matrix = [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ];
        break;
      case 4:
        this.image.src = './assets/orange-block.png';
        this.matrix = [
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0],
        ];
        break;
      case 5:
        this.image.src = './assets/orange-block.png';
        this.matrix = [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0],
        ];
        break;
      case 6:
        this.image.src = './assets/red-block.png';
        this.matrix = [
          [1, 1],
          [1, 1],
        ];
        break;
    }
  }

  update() {
    if (this.game.isColliding(this.squares)) {
      this.game.handlePieceCollision(this.squares, this.image);
    } else this.y += this.game.squareHeight;
  }

  draw(context) {
    this.squares = [];

    for (var i = 0; i < this.matrix.length; i++) {
      for (var j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] === 1) {
          this.squares.push({
            x: this.x + j * this.game.squareWidth,
            y: this.y + i * this.game.squareHeight,
          });
        }
      }
    }

    this.squares.forEach((square) => {
      // context.fillStyle = 'purple';
      // context.fillRect(
      //   square.x,
      //   square.y,
      //   this.game.squareWidth,
      //   this.game.squareHeight
      // );

      context.drawImage(
        this.image,
        square.x,
        square.y,
        this.game.squareWidth,
        this.game.squareHeight
      );
    });
  }

  matrixToRight() {
    let auxMatrix = [];
    let auxVet = [];
    let auxI = 0;
    let auxJ = 0;

    for (var j = 0; j < this.matrix.length; j++) {
      for (var i = this.matrix.length - 1; i >= 0; i--) {
        //console.log('Sexo ->' + this.matrix[i][j]);
        auxVet.push(this.matrix[i][j]);
        //auxMatrix[auxI][auxJ] = this.matrix[i][j];
        auxI += 1;
      }
      auxMatrix.push(auxVet);
      auxVet = [];
      auxJ += 1;
    }

    this.matrix = auxMatrix;
    //console.log(this.matrix);
  }
}

class Game {
  constructor(width, height) {
    this.first = true;
    this.width = width;
    this.height = height;
    this.squareWidth = 30;
    this.squareHeight = 30;
    this.nextPiece = null;
    this.currentPiece = null;
    this.inputHandler = new InputHandler(this);
    this.area = new Area(this);
    this.pieceTimer = 0;
    this.pieceInterval = 350;
    this.score = 0;
    this.scoreValue = 50;
    this.gameTimer = 0;
    this.gameInterval = 1000;
    this.gameTime = 0;

    // Sort first and next piece for starting the game
    const randPiece = Math.floor(Math.random() * 7);
    const randNextPiece = Math.floor(Math.random() * 7);

    this.currentPiece = new Piece(this, randPiece);
    this.nextPiece = new Piece(this, randNextPiece);
  }

  update(deltaTime) {
    if (this.pieceTimer < this.pieceInterval) {
      this.pieceTimer += deltaTime;
    } else {
      this.currentPiece.update();
      this.pieceTimer = 0;
    }

    if (this.gameTimer < this.gameInterval) {
      this.gameTimer += deltaTime;
    } else {
      this.gameTime += 1;
      this.gameTimer = 0;
    }

    this.renderUI();
  }

  draw(context) {
    this.currentPiece.draw(context);

    this.area.draw(context);
  }

  generatePiece() {
    this.currentPiece = this.nextPiece;
    this.nextPiece = new Piece(this, Math.floor(Math.random() * 7));

    // Verify if you lose
    var auxSquares = [];

    for (var i = 0; i < this.currentPiece.matrix.length; i++) {
      for (var j = 0; j < this.currentPiece.matrix[i].length; j++) {
        if (this.currentPiece.matrix[i][j] === 1) {
          auxSquares.push({
            x: this.currentPiece.x + j * this.squareWidth,
            y: this.currentPiece.y + i * this.squareHeight,
          });
        }
      }
    }

    if (this.isColliding(auxSquares)) {
      alert('Você perdeu, tentar novamente!');
      this.restartGame();
    }
  }

  restartGame() {
    startGame();
  }

  isColliding(squares) {
    var res = false;

    // Check collision with the bottom
    squares.forEach((square) => {
      if (square.y + this.squareHeight >= this.height && res === false) {
        res = true;
      }
    });

    // Check collision with other parts of the area
    for (var i = 0; i < this.area.squares.length; i++) {
      for (var j = 0; j < squares.length; j++) {
        if (
          squares[j].y + this.squareHeight === this.area.squares[i].y &&
          squares[j].x === this.area.squares[i].x &&
          res === false
        ) {
          //console.log('Square Bottom -> ' + (squares[j].y + this.squareHeight));
          //console.log('Area Square Top -> ' + this.area.squares[i].y);
          res = true;
        }
      }
    }

    return res;
  }

  isFree(direction) {
    var response = true;

    this.currentPiece.squares.forEach((square) => {
      // verify game borders
      if (square.x === 0 && direction === 'left') response = false;
      else if (
        square.x + this.squareWidth === this.width &&
        direction === 'right'
      )
        response = false;
      else if (
        square.y + this.squareHeight === this.height &&
        direction === 'down'
      ) {
        response = false;
      }

      // Verify other area pieces
      this.area.squares.forEach((areaSquare) => {
        if (
          square.x === areaSquare.x + this.squareWidth &&
          square.y === areaSquare.y &&
          direction === 'left'
        )
          response = false;
        else if (
          square.x + this.squareWidth === areaSquare.x &&
          square.y === areaSquare.y &&
          direction === 'right'
        )
          response = false;
        else if (
          square.y + this.squareHeight === areaSquare.y &&
          square.x === areaSquare.x &&
          direction === 'down'
        )
          response = false;
      });
    });

    return response;
  }

  handlePieceCollision(squares, image) {
    squares.forEach((square, index) => {
      this.area.squares.push({
        x: square.x,
        y: square.y,
        image: image,
      });
    });
    this.checkLinesAndEliminate();
    this.generatePiece();
  }

  checkLinesAndEliminate() {
    var lineCount = 0;

    for (var i = 0; i < this.height / this.squareHeight; i++) {
      var lineCount = 0;
      for (var j = 0; j < this.width / this.squareWidth; j++) {
        //console.log('Y -> ' + i * this.squareHeight);
        //console.log('X -> ' + j * this.squareWidth);
        this.area.squares.forEach((square) => {
          if (
            square.x === j * this.squareWidth &&
            square.y === i * this.squareHeight
          ) {
            lineCount += 1;
          }
        });
      }

      //console.log('Quadrado na linha ' + i + ' -> ' + lineCount);

      if (lineCount === this.width / this.squareWidth) {
        var newArea = this.area.squares.filter(
          (item) => item.y !== i * this.squareHeight
        );
        this.area.squares = newArea;

        this.area.squares.map((item) => {
          if (item.y < i * this.squareHeight) {
            console.log('descer');
            item.y += this.squareHeight;
          }
        });

        this.score += this.scoreValue;
      }
    }
  }

  renderUI() {
    const scoreEl = document.getElementById('score');
    const timerEl = document.getElementById('timer');
    const nextPieceEl = document.getElementById('nextPiece');
    scoreEl.innerHTML = '';
    timerEl.innerHTML = '';
    nextPieceEl.innerHTML = '';

    scoreEl.appendChild(document.createTextNode(this.score));

    let min = Math.floor(this.gameTime / 60);
    if (min < 10) min = '0' + min;
    let sec = this.gameTime % 60;
    if (sec < 10) sec = '0' + sec;
    timerEl.appendChild(document.createTextNode(min + ':' + sec));
  }
}

let game;
function startGame() {
  game = new Game(canvas.width, canvas.height);
}
startGame();

let lastTime = 0;

function animate(timeStamps) {
  let deltaTime = timeStamps - lastTime;
  lastTime = timeStamps;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(animate);
}
animate(0);
