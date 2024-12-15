const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 800;

var map;
var player;
var enemies = [];
var bullets = [];
var experiences = [];
var mousePosition = { x: 0, y: 0 };
var sec = 0;
var min = 0;
var enemiesToSpawn = [];
var xp = 0;
var level = 0;
var xpLastLevel = 0;
var xpToNextLevel = 0;

/*
*   Map
*/
class Map {
    constructor(){
        this.map = [
            ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","*"],
            ["*","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","2","1","*"],
            ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
        ]

        this.speed = 4;
        this.dirX = 0;
        this.dirY = 0;
        this.offsetX = -100;
        this.offsetY = -100;
        this.size = 50;
        this.borders = [];
    }

    update(){
        if(map.offsetX + player.speed * (player.dirX * -1) >= 0){
            if(!this.borders.includes("left"))
                this.borders.push("left")
        } else {
            this.borders = this.borders.filter((border) => border !== "left")
        }

        if(map.offsetX + player.speed * (player.dirX * -1) - canvas.width <= -(map.map[0].length * map.size)){// -(map[0].length * map.size) calcula largura total do mapa)
            if(!this.borders.includes("right"))
                this.borders.push("right")
        } else {
            this.borders = this.borders.filter((border) => border !== "right")
        }

        if(map.offsetY + player.speed * (player.dirY * -1) >= 0){
            if(!this.borders.includes("top"))
                this.borders.push("top")
        } else {
            this.borders = this.borders.filter((border) => border !== "top")
        }

        if(map.offsetY + player.speed * (player.dirY * -1) - canvas.height <= -(map.map.length * map.size)){
            if(!this.borders.includes("bottom"))
                this.borders.push("bottom")
        } else {
            this.borders = this.borders.filter((border) => border !== "bottom")
        }

        console.log(this.borders);
    }

    draw(){
        var color = "";
        this.map.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if(col === "*") color = "#d0d"
                else if(col === "1") color = "#0c0"
                else if(col === "2") color = "#070"
    
                c.fillStyle = color;
                c.fillRect(colIndex*this.size + this.offsetX, rowIndex*this.size + this.offsetY, this.size, this.size);
            })
        })
    }
}

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

        //this.x += this.speed * this.dirX;
        //this.y += this.speed * this.dirY;

        if(map.offsetX + this.speed * (this.dirX * -1) <= 0
            && map.offsetX + this.speed * (this.dirX * -1) - canvas.width >= -(map.map[0].length * map.size)){// -(map[0].length * map.size) calcula largura total do mapa
            map.offsetX += this.speed * (this.dirX * -1); // * -1 pois se o player precisa andar para a direita, o mapa precisa se mover para a esquerda
        } else {
            player.x += this.speed * this.dirX;
        }
        
        if(map.offsetY + this.speed * (this.dirY * -1) <= 0
            && map.offsetY + this.speed * (this.dirY * -1) - canvas.height >= -(map.map.length * map.size)){
            map.offsetY += this.speed * (this.dirY * -1); 
        } else {
            player.y += this.speed * this.dirY;
        }
    }

    draw(){
        c.fillStyle = "#00f";
        c.fillRect(this.x, this.y, this.width, this.height);
    }

}

class Enemy {

    constructor(x, y, width, height, speed, life, enemyType){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.life = life;
        this.enemyType = enemyType;
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
        this.x += (dx * this.speed) + (map.speed * player.dirX * -1); // Movimento em x
        this.y += (dy * this.speed) + (map.speed * player.dirY * -1); // Movimento em y
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

class Experience {

    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(){

    }

    draw(){
        c.fillStyle = "#fff";
        c.fillRect(this.x, this.y, this.width, this.height);
    }

}

startGame();
function startGame() {
    drawScreen();
    
    map = new Map();
    player = new Player((canvas.width)-(canvas.width/2)-(20), (canvas.height)-(canvas.height/2)-(20), 40, 40);

    animate();
}

function restartGame(){
    enemies = [];
    bullets = [];
    experiences = [];
    mousePosition = { x: 0, y: 0 };
    sec = 0;
    min = 0;
    enemyBaseLife = 10;
    spawnEnemyTicks = 80
    spawnBulletTicks = 0;
    then = Date.now();
    enemiesToSpawn = [];
    xp = 0;
    level = 0;
    xpLastLevel = 0;
    xpToNextLevel = 0;

    startGame();
}

/*
*   Game Loop
*/
var then = Date.now();
var fps = 60;

var spawnEnemyTicksCurrent = 0;
var spawnEnemyTicksTarget = 80;
var spawnBulletTicks = 0;
function animate () {
    var now = Date.now();
    var difference = now - then;
    
    if(difference > 1000 / fps){
        drawScreen();
        map.update();
        map.draw();
        moveExperiencesWithMap();

        player.update();
        player.draw();

        // Enemies handler
        var rounds = Math.floor((min*60 + sec)/30);
        // A quantidade de segundos dividida por 30
        // A cada 30 segundos adiciona a possibilidade de spwan para um novo inimigo
        if(rounds === 0 && !enemiesToSpawn.includes("galinha")){
            enemiesToSpawn.push("galinha");
            spawnEnemyTicksTarget = 60;
        }
        else if(rounds === 1 && !enemiesToSpawn.includes("porco")){
            enemiesToSpawn.push("porco");
            spawnEnemyTicksTarget = 50;
        }
        else if(rounds === 2 && !enemiesToSpawn.includes("vaca")){
            enemiesToSpawn.push("vaca");
            spawnEnemyTicksTarget = 45;
        }
        else if(rounds === 3 && !enemiesToSpawn.includes("cavalo")){
            enemiesToSpawn.push("cavalo");
            spawnEnemyTicksTarget = 40;
        }
        else if(rounds === 4 && !enemiesToSpawn.includes("touro")){
            enemiesToSpawn.push("touro");
            spawnEnemyTicksTarget = 35;
        }
        this.spawnEnemyTicksCurrent++;
        if(spawnEnemyTicksCurrent >= spawnEnemyTicksTarget){
            this.spawnEnemyTicksCurrent = 0;
            const {x, y, enemyType} = getEnemySpawnPositions();
            switch(enemyType){
                case "galinha":
                    this.enemies.push(new Enemy(x, y, 35, 35, 2, 10, enemyType));
                    break;
                case "porco":
                    this.enemies.push(new Enemy(x, y, 40, 40, 2, 20, enemyType));
                    break;
                case "vaca":
                    this.enemies.push(new Enemy(x, y, 50, 50, 2, 25, enemyType));
                    break;
                case "cavalo":
                    this.enemies.push(new Enemy(x, y, 45, 45, 3, 30, enemyType));
                    break;
                case "touro":
                    this.enemies.push(new Enemy(x, y, 50, 50, 3, 40, enemyType));
                    break;
            }
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

        // Experience handler
        if(experiences.length > 0){
            experiences.forEach((experience) => experience.draw())
        }

        // Player handler
        playerCollisionWithEnemies();
        playerCollisionWithExperiences();
        
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
    // Timer
    var seconds = sec < 10 ? "0"+sec : sec;
    var minutes = min < 10 ? "0"+min : min;
    c.fillStyle = "#fff";
    c.font = "40px Tiny5"
    c.fillText(minutes+":"+seconds, 20, 40)

    // Game level
    var xpBarWidth = 300;
    var xpBarHeight = 20;
    c.fillStyle = "#fff";
    c.fillRect(canvas.width - xpBarWidth - 20, 20, xpBarWidth, xpBarHeight);
    c.fillStyle = "#f00";
    c.fillRect(canvas.width - xpBarWidth - 20, 20, (xpBarWidth/(xpToNextLevel-xpLastLevel)) * (xp-xpLastLevel), xpBarHeight);
    c.fillStyle = "#fff";
    c.font = "20px sans-serif";
    c.fillText(level, canvas.width - xpBarWidth - 20 - 30, 38);
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
function moveExperiencesWithMap(){
    // Move todas as pedras de experiência junto com o mapa
    experiences.forEach((experience) => {
        experience.x += (map.speed * player.dirX * -1)
        experience.y += (map.speed * player.dirY * -1)
    })
}

function getEnemySpawnPositions(){
    const orientation = Math.floor(Math.random() * 2);
    const side = Math.floor(Math.random() * 2);
    const enemyTypeIndex = Math.floor(Math.random() * enemiesToSpawn.length);

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

    return { x: enemyX, y: enemyY, enemyType: enemiesToSpawn[enemyTypeIndex] }
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
                if(enemy.life <= 0){
                    experiences.push(new Experience(enemy.x + Math.floor(enemy.width/2) - 5, enemy.y + Math.floor(enemy.height/2) - 5, 10, 10))
                    enemyIndex = index2;
                }
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
                restartGame();
        }
    })

}

function playerCollisionWithExperiences(){
    var experienceIndexes = [];

    this.experiences.forEach((experience, index) => {

        if(player.x < experience.x + experience.width &&
            player.x + player.width > experience.x &&
            player.y < experience.y + experience.height &&
            player.y + player.height > experience.y
        ){
            experienceIndexes.push(index);
            xp += 10;
            if(xp < 100){
                level = 0;
                xpLastLevel = 0;
                xpToNextLevel = 100;
            }
            else if(xp < 500) {
                level = 1;
                xpLastLevel = 100;
                xpToNextLevel = 500;
            }
            else if(xp < 1000) {
                level = 2;
                xpLastLevel = 500;
                xpToNextLevel = 1000;
            }
            else if(xp < 1500) {
                level = 3;
                xpLastLevel = 1000;
                xpToNextLevel = 1500;
            }
            else if(xp < 2000) {
                level = 4;
                xpLastLevel = 1500;
                xpToNextLevel = 2000;
            }
            else if(xp < 2500) {
                level = 5;
                xpLastLevel = 2000;
                xpToNextLevel = 2500;
            }
            else if(xp < 3000) {
                level = 6;
                xpLastLevel = 2500;
                xpToNextLevel = 3000;
            }
            else if(xp < 3500) {
                level = 7;
                xpLastLevel = 3000;
                xpToNextLevel = 3500;
            }
            else if(xp < 4000) {
                level = 8;
                xpLastLevel = 3500;
                xpToNextLevel = 4000;
            }
            else if(xp < 4500) {
                level = 9;
                xpLastLevel = 4000;
                xpToNextLevel = 4500;
            }
            else if(xp < 5000) {
                level = 10;
                xpLastLevel = 4500;
                xpToNextLevel = 5000;
            }
            else if(xp < 5500) {
                level = 11;
                xpLastLevel = 5000;
                xpToNextLevel = 5500;
            }
            else if(xp < 6000) {
                level = 12;
                xpLastLevel = 5500;
                xpToNextLevel = 6000;
            }
            else if(xp < 6500) {
                level = 13;
                xpLastLevel = 6000;
                xpToNextLevel = 6500;
            }
            else if(xp < 7000) {
                level = 14;
                xpLastLevel = 6500;
                xpToNextLevel = 7000;
            }
            else if(xp < 7500) {
                level = 15;
                xpLastLevel = 7000;
                xpToNextLevel = 7500;
            }
            else if(xp < 8000) {
                level = 16;
                xpLastLevel = 7500;
                xpToNextLevel = 8000;
            }
            else if(xp < 8500) {
                level = 17;
                xpLastLevel = 8000;
                xpToNextLevel = 8500;
            }
            else if(xp < 9000) {
                level = 18;
                xpLastLevel = 8500;
                xpToNextLevel = 9000;
            }
            else if(xp < 9500) {
                level = 19;
                xpLastLevel = 9000;
                xpToNextLevel = 9500;
            }
            else {
                level = 20;
                xpLastLevel = 9500;
                xpToNextLevel = 1000;
            }
        }
    })

    experienceIndexes.forEach((item) => experiences.splice(item, 1));

}