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
}

class Apple {
    constructor(){
        this.place = {
            x: 0,
            y: 0
        }
        this.active = false
    }

    randomSpawn(snake, fieldX, fieldY) {
        let randX = Math.floor(0 + Math.random()*(fieldX + 1 - 0));
        let randY = Math.floor(0 + Math.random()*(fieldY + 1 - 0));
        snake.forEach(item => {
            if (randX == item.x && randY == item.y) {
                randY++;
                randX--;
            }
        })
        this.place.x = randX;
        this.place.y = randY;
        this.active = true;
    }
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
let apples = new Apple();

function createEnv() {
    for (let i=0; i<playerSnake.body.length;i++) {
        snakeBody.push(document.querySelector(`[posx="${playerSnake.body[i].x+startX}"][posy="${playerSnake.body[i].y+startY}"]`));
        snakeCoord[i] = {x: playerSnake.body[i].x+startX, y: playerSnake.body[i].y+startY};
    }
    snakeBody.forEach(item => item.classList.add('snake-part'));
    snakeBody[snakeBody.length-1].classList.add('tail')
}

function move() {
    snakeBody[snakeBody.length-1].classList.remove('tail')

    if(+snakeCoord[snakeCoord.length-2].x+1 == snakeCoord[snakeCoord.length-1].x) {
        snakeBody[snakeBody.length-1].classList.remove('tailXR')
    }
    if(+snakeCoord[snakeCoord.length-2].x-1 == snakeCoord[snakeCoord.length-1].x) {
        snakeBody[snakeBody.length-1].classList.remove('tailXL')
    }
    if(+snakeCoord[snakeCoord.length-2].y+1 == snakeCoord[snakeCoord.length-1].y) {
        snakeBody[snakeBody.length-1].classList.remove('tailYU')
    }
    if(+snakeCoord[snakeCoord.length-2].y-1 == snakeCoord[snakeCoord.length-1].y) {
        snakeBody[snakeBody.length-1].classList.remove('tailYD')
    }

    document.querySelectorAll('.cut-part').forEach(item => item.classList.remove('cut-part'))
    snakeBody.forEach(item => item.classList.remove('snake-part'));
    if (+snakeCoord[0].y + UDside < 0 || +snakeCoord[0].y + UDside > 23) {
        snakeCoord[0].y == 0 ? snakeCoord[0].y = 23 - UDside : snakeCoord[0].y = 0 - UDside;
    }
    
    if (+snakeCoord[0].x + LRside < 0 || +snakeCoord[0].x + LRside > 19) {
        snakeCoord[0].x == 0 ? snakeCoord[0].x = 19 - LRside : snakeCoord[0].x = 0 - LRside;
    }

    snakeBody.unshift(document.querySelector(`[posx="${+(snakeCoord[0].x)+LRside}"][posy="${+snakeCoord[0].y + UDside}"]`));
    snakeCoord.unshift({ x: snakeBody[0].getAttribute('posx'), y: snakeBody[0].getAttribute('posy') })
    if (snakeBody.length > playerSnake.length) {
        snakeBody.pop();
        snakeCoord.pop();
    }
    snakeBody[snakeBody.length-1].classList.add('tail')
    snakeBody.forEach(item => item.classList.add('snake-part'));

    if(+snakeCoord[snakeCoord.length-2].x+1 == snakeCoord[snakeCoord.length-1].x) {
        snakeBody[snakeBody.length-1].classList.add('tailXR')
    }
    if(+snakeCoord[snakeCoord.length-2].x-1 == snakeCoord[snakeCoord.length-1].x) {
        snakeBody[snakeBody.length-1].classList.add('tailXL')
    }
    if(+snakeCoord[snakeCoord.length-2].y+1 == snakeCoord[snakeCoord.length-1].y) {
        snakeBody[snakeBody.length-1].classList.add('tailYU')
    }
    if(+snakeCoord[snakeCoord.length-2].y-1 == snakeCoord[snakeCoord.length-1].y) {
        snakeBody[snakeBody.length-1].classList.add('tailYD')
    }

    flag = true;
}

function loop() {
    
    move();
    if (!apples.active) {
        apples.randomSpawn(snakeCoord, colW, colH);
        document.querySelector(`[posx="${apples.place.x}"][posy="${apples.place.y}"]`).classList.add('apple');
    }
    if (snakeCoord[0].x == apples.place.x && snakeCoord[0].y == apples.place.y) {
        //eating apple
        document.querySelector(`[posx="${apples.place.x}"][posy="${apples.place.y}"]`).classList.remove('apple');
        apples.active = false;
        //add part to snake
        snakeBody.push(document.querySelector(`[posx="${+(snakeCoord[snakeCoord.length-1].x)+LRside}"][posy="${+snakeCoord[snakeCoord.length-1].y + UDside}"]`));
        snakeCoord.push({ x: snakeBody[snakeBody.length-1].getAttribute('posx'), y: snakeBody[snakeBody.length-1].getAttribute('posy') })
    }
    for (let i=1; i<snakeCoord.length;i++) {
        if (snakeCoord[0].x == snakeCoord[i].x && snakeCoord[0].y == snakeCoord[i].y) {
            let cutPart = snakeBody.splice(i, snakeBody.length)
            snakeCoord.splice(i, snakeCoord.length)
            cutPart.forEach(cut => {
                cut.classList.add('cut-part');
                cut.classList.remove('snake-part')
            }
        )
    }
}
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
let loopGame = setInterval(loop, 300);