function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";
    switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;
        case "touchend":   type="mouseup"; break;
        default: return;
    }

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
        first.screenX, first.screenY,
        first.clientX, first.clientY, false,
        false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

var Invader = function (speed, radius , positionX, positionY, noteColor) {
    this.speed = speed;
    this.radius = radius;
    this.positionX = positionX;
    this.positionY = positionY;
    this.noteColor = noteColor;
    this.detectedState = false;
};

var GameSettings = function ( numberOfInvaders, minInvaderSize, maxInvaderSize , minSpeed, maxSpeed, BGMusic ) {
    this.numberOfInvaders = numberOfInvaders;
    this.minInvaderSize = minInvaderSize;
    this.maxInvaderSize = maxInvaderSize;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.BGMusic = BGMusic;
};


function drawInvader(invader) {
    canvasObject.fillStyle = invader.noteColor;
    enemyBody(invader.positionX,invader.positionY,invader.radius);
    canvasObject.fillStyle = "white";
    enemyBody(invader.positionX-invader.radius/2,invader.positionY,(invader.radius)/4);
    enemyBody(invader.positionX+invader.radius/2,invader.positionY,(invader.radius)/4);
}

function enemyBody(x,y,r) {
    canvasObject.beginPath();
    canvasObject.arc(x, y, r, 0, Math.PI*2, true);
    canvasObject.fill();
}

function rect(x,y,w,h) {
    canvasObject.beginPath();
    canvasObject.rect(x,y,w,h);
    canvasObject.closePath();
    canvasObject.fill();
}

function randomNumber (min , max) {
    return Math.floor(Math.random()*max + min);
}

function clear() {
    canvasObject.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);

    canvas = document.getElementById("canvas");
    canvasObject = canvas.getContext("2d");
    for(var i = 0 ; i< gameSettings.numberOfInvaders ; i++){
        enemies.push( new Invader(randomNumber(gameSettings.minSpeed, gameSettings.maxSpeed),randomNumber(gameSettings.minInvaderSize, gameSettings.maxInvaderSize),WIDTH,randomNumber(0,HEIGHT),"black"));
        if(audioPlayers.length < 5) {
            audioPlayers.push(new Audio(sounds[randomNumber(0,3)]));
        }
    }
    //playBGMusic
    return setInterval(draw,15);
}

function drawDebugMouse(currentXPosition, currentYPosition) {
    canvasObject.fillStyle =  "#111111";
    canvasObject.fillRect(currentXPosition, currentYPosition, 5, 5);
}

function drawStaticGame() {
    canvasObject.fillStyle = "#FAF7F8";
    rect(0,0,WIDTH,HEIGHT);
    canvasObject.fillStyle = "green";
    rect(0,0,5,HEIGHT);
}

function draw() {
    clear();
    drawStaticGame();
    drawDebugMouse(currentXPosition, currentYPosition);

    for(var i = 0; i < enemies.length; i++) {
        enemies[i] = detectEnemy(enemies[i]);
        drawInvader(enemies[i]);
        if(enemies[i].positionX > 0) {
            enemies[i].positionX -= enemies[i].speed;
        }
        else {
            enemies[i] = resetEnemy(enemies[i]);
            if(enemies[i].detectedState == true) {
                currentScore = currentScore + 1;
                audioPlayers[i] = new Audio(sounds[randomNumber(0,3)]).play();
            }
            enemies[i].detectedState = false;
        }
    }
}

function resetEnemy (invader) {
    invader.positionX = WIDTH;
    invader.positionY = randomNumber(0,HEIGHT);
    invader.speed = randomNumber(gameSettings.minSpeed , gameSettings.maxSpeed);
    invader.radius = randomNumber(gameSettings.minInvaderSize , gameSettings.maxInvaderSize);
    invader.noteColor = "black";
    return invader;
}

function detectEnemy(invader) {

    if(currentXPosition <= invader.positionX + invader.radius &&
        currentXPosition >= invader.positionX - invader.radius &&
        currentYPosition <= invader.positionY + invader.radius &&
        currentYPosition >= invader.positionY - invader.radius &&
        invader.detectedState == false
    ){
        invader= new Invader(invader.speed,invader.radius, invader.positionX,invader.positionY , colors[randomNumber(0,4)]);
        invader.detectedState = true;
    }
    return invader;
}

function getMousePosition(mousePointer) {
    currentXPosition = mousePointer.pageX;
    currentYPosition = mousePointer.pageY;
    if (currentXPosition < 0){
        currentXPosition = 0;
    }
    if (currentYPosition < 0){
        currentYPosition = 0;
    }
    document.currentMousePosition.MouseX.value = currentXPosition;
    document.currentMousePosition.MouseY.value = currentYPosition;
    document.currentMousePosition.currentPlayerScore.value = currentScore;
}
var canvas;
var gameSettings = new GameSettings(20,15,35,1,10,"");
var WIDTH = 700;
var HEIGHT = 600;
var currentXPosition = 0;
var currentYPosition = 0;
var currentScore = 0;

var colors = [
    "yellow",
    "blue",
    "green",
    "red",
    "purple",
];

var sounds = [
    "music/guitar/a.wav",
    "music/guitar/b.wav",
    "music/guitar/d.wav",
    "music/guitar/f.wav",
    "music/guitar/e.wav",
];

var enemies = [];
var audioPlayers = [];

document.onmousemove = getMousePosition;