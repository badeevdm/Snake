/**
* global variables
*/

const colW = 20, colH = 24,
snakeGame = document.getElementById('snackeGame'),
startX = 10, startY = 10; 
let snakeBody = [], snakeCoord = [],
LRside = 0, UDside = -1, flag = false;



/**
* Classes 
*/

class Snake {

    constructor (){
        this.body = [
            {x:0, y:0},
            {x:0, y:1},
            {x:0, y:2},
            {x:0, y:3},
            {x:0, y:4},
        ]
        this.length = 5
    }
    
    moveUp     () {}
    moveBottom () {}
    moveLeft   () {}
    moveRight  () {}
}

class Apple {

}

/**
* Playing field render
*/
for (let i=0; i<colH; i++) {
    for (let j=0; j<colW; j++) {
        let ceil = document.createElement('div');
        ceil.classList.add('ceil');
        snakeGame.appendChild(ceil);
        ceil.setAttribute('posX', j);
        ceil.setAttribute('posY', i);
    }
}

let playerSnake = new Snake();

function createEnv() {
    for (let i=0; i<playerSnake.body.length;i++) {
        snakeBody.push(document.querySelector(`[posx="${playerSnake.body[i].x+startX}"][posy="${playerSnake.body[i].y+startY}"]`));
        snakeCoord[i] = {x: playerSnake.body[i].x+startX, y: playerSnake.body[i].y+startY};
    }
    snakeBody.forEach(item => item.classList.add('snake-part'));
}

function move() {
    snakeBody.forEach(item => item.classList.remove('snake-part'));
    snakeBody.unshift(document.querySelector(`[posx="${+(snakeCoord[0].x)+LRside}"][posy="${+snakeCoord[0].y + UDside}"]`));
    snakeCoord.unshift({ x: snakeBody[0].getAttribute('posx'), y: snakeBody[0].getAttribute('posy') })
    if (snakeBody.length > playerSnake.length) {
        snakeBody.pop();
        snakeCoord.pop();
    }
    snakeBody.forEach(item => item.classList.add('snake-part'));
    flag = true;
}

function loop() {
    
    move();

}

createEnv();

document.addEventListener('keydown', function(event){
    if (event.keyCode === 37 && LRside != 1 && flag) {
        flag = false;
        LRside = -1;
        UDside = 0;
    }
    if (event.keyCode === 39 && LRside != -1 && flag) {
        flag = false;
        LRside = 1;
        UDside = 0;
    }
    if (event.keyCode === 38 && UDside != 1 && flag) {
        flag = false;
        LRside = 0;
        UDside = -1;
    }
    if (event.keyCode === 40 && UDside != -1 && flag) {
        flag = false;
        LRside = 0;
        UDside = 1;
    }
})
// let loopGame = setInterval(loop, 150);