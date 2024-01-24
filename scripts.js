const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

class InputHandler {
  constructor(game) {
    this.game = game;

    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'ArrowRight' &&
        (this.game.curDir !== 'left' || this.game.parts.length === 0)
      )
        this.game.curDir = 'right';
      else if (
        e.key === 'ArrowLeft' &&
        (this.game.curDir !== 'right' || this.game.parts.length === 0)
      )
        this.game.curDir = 'left';
      else if (
        e.key === 'ArrowUp' &&
        (this.game.curDir !== 'down' || this.game.parts.length === 0)
      )
        this.game.curDir = 'up';
      else if (
        e.key === 'ArrowDown' &&
        (this.game.curDir !== 'up' || this.game.parts.length === 0)
      )
        this.game.curDir = 'down';
    });
  }
}

class Food {
  constructor(game) {
    this.game = game;
    this.x = Math.floor((Math.random() * canvas.width) / 10) * 10;
    this.y = Math.floor((Math.random() * canvas.height) / 10) * 10;
    this.width = 10;
    this.height = 10;
    this.image = new Image();
  }

  update() {
    this.checkCollision();
  }

  draw(context) {
    //context.fillStyle = 'red';
    //context.fillRect(this.x, this.y, this.width, this.height);
    this.image.src = './assets/food.png';
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  checkCollision() {
    if (
      this.game.firstPart.x + this.game.firstPart.width > this.x &&
      this.game.firstPart.x < this.x + this.width &&
      this.game.firstPart.y + this.game.firstPart.height > this.y &&
      this.game.firstPart.y < this.y + this.height
    ) {
      this.game.eatFood();
    }
  }
}

class Part {
  constructor(game, x, y, moves, image) {
    this.game = game;
    this.width = 10;
    this.height = 10;
    this.x = x;
    this.y = y;
    this.moves = moves;
    this.image = image;
  }

  draw(context) {
    //context.fillStyle = 'white';
    //context.fillRect(this.x, this.y, this.width, this.height);

    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    switch (this.moves[0]) {
      case 'right':
        this.x += this.game.speed;
        break;
      case 'down':
        this.y += this.game.speed;
        break;
      case 'left':
        this.x -= this.game.speed;
        break;
      case 'up':
        this.y -= this.game.speed;
        break;
    }

    this.moves.splice(0, 1);
    this.moves.push(this.game.curDir);
  }
}

class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.points = 0;
    this.curDir = 'right';
    this.speed = 10;
    this.parts = [];
    this.firstPart = new Part(this, 0, 0, [this.curDir]);
    this.food = new Food(this);
    this.inputHandler = new InputHandler(this);
    this.moveTimer = 0;
    this.moveInterval = 50;
  }

  update(deltaTime) {
    if (this.moveTimer < this.moveInterval) {
      this.moveTimer += deltaTime;
    } else {
      this.firstPart.update();
      this.parts.forEach((part) => {
        part.update();
      });

      if (this.checkPartsCollision()) {
        if (confirm('Você perdeu! Deseja continuar?')) {
          startGame();
        }
      }

      this.food.update();

      this.moveTimer = 0;
    }
  }

  draw(context) {
    this.food.draw(context);

    let headImage = new Image();
    let image = new Image();

    // HANDLE HEAD IMAGE
    switch (this.curDir) {
      case 'right':
        headImage.src = './assets/head-right.png';
        break;
      case 'left':
        headImage.src = './assets/head-left.png';
        break;
      case 'up':
        headImage.src = './assets/head-up.png';
        break;
      case 'down':
        headImage.src = './assets/head-down.png';
        break;
    }

    this.firstPart.image = headImage;
    this.firstPart.draw(context);

    if (this.parts.length > 0) {
      var prevPart;
      var nextPart;

      this.parts.forEach((part, index) => {
        if (this.parts.length === 1) {
          prevPart = this.firstPart;
          nextPart = null;
        } else {
          if (index === 0) {
            prevPart = this.firstPart;
          } else prevPart = this.parts[index - 1];

          if (index === this.parts.length - 1) {
            nextPart = null;
          } else {
            nextPart = this.parts[index + 1];
          }
        }

        //console.log(nextPart);
        let auxArr = this.handleNeighbors(part.x, part.y, prevPart, nextPart);

        if (auxArr.length === 1) {
          if (auxArr[0] === 'up')
            this.parts[index].image.src = './assets/tale-bottom.png';
          else if (auxArr[0] === 'down')
            this.parts[index].image.src = './assets/tale-top.png';
          else if (auxArr[0] === 'left')
            this.parts[index].image.src = './assets/tale-right.png';
          else if (auxArr[0] === 'right')
            this.parts[index].image.src = './assets/tale-left.png';
        } else {
          if (auxArr.includes('up') && auxArr.includes('down'))
            this.parts[index].image.src = './assets/vertical-body.png';
          else if (auxArr.includes('left') && auxArr.includes('right'))
            this.parts[index].image.src = './assets/horizontal-body.png';
          else if (auxArr.includes('right') && auxArr.includes('down'))
            this.parts[index].image.src = './assets/border1.png';
          else if (auxArr.includes('down') && auxArr.includes('left'))
            this.parts[index].image.src = './assets/border2.png';
          else if (auxArr.includes('left') && auxArr.includes('up'))
            this.parts[index].image.src = './assets/border3.png';
          else if (auxArr.includes('up') && auxArr.includes('right'))
            this.parts[index].image.src = './assets/border4.png';
        }

        part.draw(context);
      });
    }
  }

  eatFood() {
    this.food = new Food(this);
    this.points += 10;

    let moves = [this.firstPart.moves[0]];
    let yOffset;
    let xOffset;

    switch (this.firstPart.moves[0]) {
      case 'up':
        yOffset = 10;
        xOffset = 0;
        break;
      case 'down':
        yOffset = -10;
        xOffset = 0;
        break;
      case 'left':
        xOffset = 10;
        yOffset = 0;
        break;
      case 'right':
        xOffset = -10;
        yOffset = 0;
        break;
    }

    if (this.parts.length) {
      this.parts[this.parts.length - 1].moves.forEach((move) => {
        moves.push(move);
      });
    } else {
      this.firstPart.moves.forEach((move) => {
        moves.push(move);
      });
    }

    if (this.parts.length) {
      this.parts.push(
        new Part(
          this,
          this.parts[this.parts.length - 1].x + xOffset,
          this.parts[this.parts.length - 1].y + yOffset,
          moves,
          new Image()
        )
      );
    } else {
      this.parts.push(
        new Part(
          this,
          this.firstPart.x + xOffset,
          this.firstPart.y + yOffset,
          moves,
          new Image()
        )
      );
    }
  }

  checkPartsCollision() {
    var response = false;

    // Check collision with other parts
    if (this.parts.length) {
      this.parts.forEach((part) => {
        if (
          part.x + part.width > this.firstPart.x &&
          this.curDir !== 'left' &&
          part.x < this.firstPart.x + this.firstPart.width &&
          part.y + part.height > this.firstPart.y &&
          part.y < this.firstPart.y + this.firstPart.height &&
          response === false
        )
          response = true;
      });
    }

    // Check collision with borders
    if (
      this.firstPart.x < 0 ||
      this.firstPart.x + this.firstPart.width > this.width ||
      this.firstPart.y < 0 ||
      this.firstPart.y + this.firstPart.height > this.height
    )
      response = true;

    return response;
  }

  handleNeighbors(x, y, prevPart, nextPart) {
    let auxArr = [];

    //console.log(prevPart);

    // Handle Prev Part
    if (x === prevPart.x + prevPart.width) auxArr.push('left');
    else if (x === prevPart.x - prevPart.width) auxArr.push('right');
    else if (y === prevPart.y + prevPart.height) auxArr.push('up');
    else if (y === prevPart.y - prevPart.height) auxArr.push('down');

    // // Handle Next Part
    if (nextPart !== null) {
      if (x === nextPart.x + nextPart.width) auxArr.push('left');
      else if (x === nextPart.x - nextPart.width) auxArr.push('right');
      else if (y === nextPart.y + nextPart.height) auxArr.push('up');
      else if (y === nextPart.y + nextPart.height) auxArr.push('down');
    }

    return auxArr;
  }
}

let game;
function startGame() {
  game = new Game(canvas.width, canvas.height);
}
startGame();

let lastTime = 0;

function animate(timestamps) {
  let deltaTime = timestamps - lastTime;
  lastTime = timestamps;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(animate);
}
animate(0);
