function GameSettings(numberOfInvaders, minInvaderSize, maxInvaderSize, minSpeed, maxSpeed) {
    this.numberOfInvaders = numberOfInvaders;
    this.minInvaderSize = minInvaderSize;
    this.maxInvaderSize = maxInvaderSize;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
}

function Invader (speed, radius, positionX, positionY, noteColor) {
    this.speed = speed;
    this.radius = radius;
    this.positionX = positionX;
    this.positionY = positionY;
    this.noteColor = noteColor;
    this.detectedState = false;
};

function drawInvader(invader) {
    canvasObject.fillStyle = invader.noteColor;
    EnemyBody(invader.positionX, invader.positionY, invader.radius);
    canvasObject.fillStyle = "white";
    EnemyBody(invader.positionX - invader.radius / 2, invader.positionY, (invader.radius) / 4);
    EnemyBody(invader.positionX + invader.radius / 2, invader.positionY, (invader.radius) / 4);
};

function EnemyBody(x, y, r) {
    canvasObject.beginPath();
    canvasObject.arc(x, y, r, 0, Math.PI * 2, true);
    canvasObject.fill();
};

function randomNumber(min, max) {
    return Math.floor(Math.random() * max + min);
};

function clear() {
    canvasObject.clearRect(0, 0, WIDTH, HEIGHT);
};

var initGame = function() {
    canvas = document.getElementById("canvas");
    canvasObject = canvas.getContext("2d");
    window.addEventListener('resize', resizeCanvas, false);
            function resizeCanvas() {
                    canvas.width = window.innerWidth;
                    canvas.height = 100;
                    drawInvaders();
            }
            resizeCanvas();
};

function drawInvaders() {
  for (var i = 0; i < gameSettings.numberOfInvaders; i++) {
      enemies[i]= new Invader(
          randomNumber(gameSettings.minSpeed, gameSettings.maxSpeed),
          randomNumber(gameSettings.minInvaderSize, gameSettings.maxInvaderSize),
          randomNumber(WIDTH, WIDTH + 20) ,
          randomNumber(gameSettings.maxInvaderSize, HEIGHT - 35 ),
          colors[randomNumber(0, colors.length)]);
  }
};

function draw() {
    clear();
    for (var i = 0; i < enemies.length; i++) {
        drawInvader(enemies[i]);
        if (enemies[i].positionX > -50) {
            enemies[i].positionX -= enemies[i].speed;
        } else {
            enemies[i] = resetEnemy(enemies[i]);
        }
    }
};

function resetEnemy(invader) {
    invader.positionX = randomNumber(WIDTH, WIDTH + 20);
    invader.positionY = randomNumber(gameSettings.maxInvaderSize, HEIGHT - 35);
    invader.speed = randomNumber(gameSettings.minSpeed, gameSettings.maxSpeed);
    invader.radius = randomNumber(gameSettings.minInvaderSize, gameSettings.maxInvaderSize);
    invader.noteColor = colors[randomNumber(0,colors.length)];
    return invader;
};


//numberOfInvaders, minInvaderSize, maxInvaderSize, minSpeed, maxSpeed, BGMusic
const gameSettings = new GameSettings(5, 10, 15, 1, 4);
const WIDTH = window.innerWidth;
const HEIGHT = 100;
let canvas;

const colors = [
    "red",
    "#aaa",
    "black"
];

const enemies = [gameSettings.numberOfInvaders];
setInterval(draw, 16.67); //approx 60 fps
window.onload = initGame;
