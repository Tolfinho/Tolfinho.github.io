const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 800;

var player;
var enemies = [];
var bullets = [];
var mousePosition = { x: 0, y: 0 };
var sec = 0;
var min = 0;
var enemyBaseLife = 10;

/*
*   Classes
*/
class Player {

    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dirX = 0;
        this.dirY = 0;
        this.speed = 4;
        this.movements = { right: false, left: false, up: false, down: false }
        this.life = 1;
    }

    update(){
        if(this.movements.right){
            this.dirX = 1;
        } else if(this.movements.left){
            this.dirX = -1;
        } else {
            this.dirX = 0;
        }

        if(this.movements.up){
            this.dirY = -1;
        } else if(this.movements.down){
            this.dirY = 1;
        } else {
            this.dirY = 0;
        }

        this.x += this.speed * this.dirX;
        this.y += this.speed * this.dirY;
    }

    draw(){
        c.fillStyle = "#00f";
        c.fillRect(this.x, this.y, this.width, this.height);
    }

}

class Enemy {

    constructor(x, y, width, height, speed, life){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.life = life;
    }

    update(){
        // Calcular a diferença em cada eixo
        let dx = player.x - this.x;
        let dy = player.y - this.y;

        // Calcular a magnitude do vetor
        let magnitude = Math.sqrt(dx * dx + dy * dy);

        // Normalizar o vetor para que o bot se mova uniformemente
        if (magnitude !== 0) {
            dx = dx / magnitude; // Normaliza em x
            dy = dy / magnitude; // Normaliza em y
        }

        // Atualizar a posição do bot com o movimento uniforme
        this.x += dx * this.speed; // Movimento em x
        this.y += dy * this.speed; // Movimento em y
    }

    draw(){
        c.fillStyle = "#f00";
        c.fillRect(this.x, this.y, this.width, this.height);
        c.fillStyle = "#000";
        c.font = "20px sans-serif";
        c.fillText(this.life, this.x + this.width/2, this.y + this.height/2);
    }

}

class Bullet {

    constructor(x, y, width, height, speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.dx = mousePosition.x - this.x;
        this.dy = mousePosition.y - this.y;

        // Calcular a magnitude do vetor
        let magnitude = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

        // Normalizar o vetor para que o bot se mova uniformemente
        if (magnitude !== 0) {
            this.dx = this.dx / magnitude; // Normaliza em x
            this.dy = this.dy / magnitude; // Normaliza em y
        }
    }

    update(){
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }

    draw(){
        c.fillStyle = "#ff0";
        c.fillRect(this.x, this.y, this.width, this.height);
    }

}

startGame();
function startGame() {
    drawScreen();
    
    player = new Player((canvas.width)-(canvas.width/2)-(20), (canvas.height)-(canvas.height/2)-(20), 40, 40);

    animate();
}

function restartGame(){
    enemies = [];
    bullets = [];
    mousePosition = { x: 0, y: 0 };
    sec = 0;
    min = 0;
    enemyBaseLife = 10;
    spawnEnemyTicks = 80
    spawnBulletTicks = 0;
    then = Date.now();

    startGame();
}

/*
*   Game Loop
*/
var then = Date.now();
var fps = 60;

var spawnEnemyTicks = 80;
var spawnBulletTicks = 0;
function animate () {
    var now = Date.now();
    var difference = now - then;
    
    if(difference > 1000 / fps){
        drawScreen();

        player.update();
        player.draw();

        // Enemies handler
        this.spawnEnemyTicks++;
        if(spawnEnemyTicks >= 100){
            this.spawnEnemyTicks = 0;
            const {enemyX, enemyY} = getEnemySpawnPositions();
            this.enemies.push(new Enemy(enemyX, enemyY, 60, 60, 2, enemyBaseLife));
        }
        if(this.enemies.length > 0){
            this.enemies.forEach((enemy) => {
                enemy.update();
                enemy.draw();
            })
        }

        // Bullets handler
        this.spawnBulletTicks++;
        if(this.spawnBulletTicks >= 5){
            this.spawnBulletTicks = 0;
            this.bullets.push(new Bullet(player.x, player.y, 10, 10, 10));
        }
        if(this.bullets.length > 0){
            this.bullets.forEach((bullet) => {
                bullet.update();
                bullet.draw();
            })
        }
        bulletCollisionWithEnemy();
        bulletOutOfMap();
        playerCollisionWithEnemies();

        drawGameHud();

        then = now;
    }

    requestAnimationFrame(animate);
}



/*
*   Event Listeners
*/
document.addEventListener("keydown", (e) => {

    if(e.key === "d" || e.key === "ArrowRight"){
        this.player.movements.right = true;
        this.player.movements.left = false;
    } else if(e.key === "a" || e.key === "ArrowLeft"){
        this.player.movements.left = true;
        this.player.movements.right = false;
    }

    if(e.key === "w" || e.key === "ArrowUp"){
        this.player.movements.up = true;
        this.player.movements.down = false;
    } else if(e.key === "s" || e.key === "ArrowDown"){
        this.player.movements.down = true;
        this.player.movements.up = false;
    }

})

document.addEventListener("keyup", (e) => {

    if(e.key === "d" || e.key === "ArrowRight"){
        this.player.movements.right = false;
    } else if(e.key === "a" || e.key === "ArrowLeft"){
        this.player.movements.left = false;
    }

    if(e.key === "w" || e.key === "ArrowUp"){
        this.player.movements.up = false;
    } else if(e.key === "s" || e.key === "ArrowDown"){
        this.player.movements.down = false;
    }

})

canvas.addEventListener("mousemove", (e) => {
    this.mousePosition.x = e.offsetX >= 0 ? e.offsetX : 0;
    this.mousePosition.y = e.offsetY >= 0 ? e.offsetY : 0;
})


/*
*   HUD
*/
function drawScreen(){
    c.fillStyle = "#000";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawGameHud(){
    var seconds = sec < 10 ? "0"+sec : sec;
    var minutes = min < 10 ? "0"+min : min;
    c.fillStyle = "#fff";
    c.font = "40px Tiny5"
    c.fillText(minutes+":"+seconds, 20, 40)
}

const gameTimer = setInterval(() => {
    sec++;
    if(sec === 60){
        min++;
        sec = 0;
        enemyBaseLife += 10;
    }
}, 1000)


/*
*   Utilities
*/
function getEnemySpawnPositions(){
    const orientation = Math.floor(Math.random() * 2);
    const side = Math.floor(Math.random() * 2);

    var enemyX, enemyY;

    if(orientation === 0){
        enemyX = Math.floor(Math.random() * (canvas.width + player.width + 1)) - player.width;
        if(side === 0){
            enemyY = 0 - player.height;
        } else if(side === 1){
            enemyY = canvas.height;
        }
    } else if(orientation === 1){
        enemyY = Math.floor(Math.random() * (canvas.height + player.height + 1)) - player.height;
        if(side === 0){
            enemyX = 0 - player.width;
        } else if(side === 1){
            enemyX = canvas.width;
        }
    }

    return { enemyX, enemyY }
}

function bulletCollisionWithEnemy(){

    if(bullets.length === 0) return;

    if(enemies.length === 0) return;

    var bulletIndex = -1;
    var enemyIndex = -1;
    this.bullets.forEach((bullet, index) => {
        this.enemies.forEach((enemy, index2) => {

            if(bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ){
                bulletIndex = index;

                enemy.life -= 1;
                if(enemy.life <= 0)
                    enemyIndex = index2;
            }
        })
    })

    if(bulletIndex !== -1)
        bullets.splice(bulletIndex, 1);

    if(enemyIndex !== -1)
        enemies.splice(enemyIndex, 1);

}

function bulletOutOfMap(){

    if(bullets.length === 0) return;

    var bulletIndex = -1;
    this.bullets.forEach((bullet, index) => {
        if(bullet.x + bullet.width < 0 ||
            bullet.x > canvas.width ||
            bullet.y + bullet.height < 0 ||
            bullet.y > canvas.height
        ){
            bulletIndex = index;
        }
    })

    if(bulletIndex !== -1)
        bullets.splice(bulletIndex, 1);

}

function playerCollisionWithEnemies(){

    this.enemies.forEach((enemy, index) => {

        if(player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ){
            player.life--;
            if(player.life <= 0)
                if(window.confirm("Jogar novamente?"))
                    restartGame();
        }
    })

}