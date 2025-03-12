/*
 * Implementation of the game of Pong
 *
 * Gilberto Echeverria
 * 2025-02-25
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let oldTime;
const paddleVelocity = 1.3;
const initialSpeed = 0.5;

let blocksDestroyed= 0;
let Lifes = 3;

const blocks=[];
let rows=3;
let columns=10;
const blockHeight=20;
const blockWidth=80;
const blockSpace=10;
const blockMarginT=80;
const blockMarginL=40;


// Context of the Canvas
let ctx;

class Block extends GameObject{
    constructor(position, width, height, color){
        super(position, width, height, color, "block");
        this.active=true;
    }
}

function createBlocks(){
    blocks.length=0;

    const WidthT= canvasWidth-2*blockMarginL;
    const calculated= (WidthT- (columns-1)*blockSpace)/columns;

    for (let i=0; i<rows; i++){
        for (let j=0; j<columns; j++){
            const blockX= blockMarginL+j*(calculated+blockSpace);
            const blockY= blockMarginT+i*(blockHeight+blockSpace);

            let color;
            switch(i%5) {
                case 0: color= "red"; break;
                case 1: color= "orange"; break;
                case 2: color= "yellow"; break;
                case 3: color= "green"; break;
                case 4: color= "blue"; break;
                default: color= "white";
            }

            blocks.push(new GameObject(new Vec(blockX, blockY), calculated, blockHeight, color));
        }
    }
}

// Clases for the Breakout game
class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.initVelocity();
        this.inPlay = false;
    }

    update(deltaTime) {
        if(this.inPlay){
            this.position= this.position.plus(this.velocity.times(deltaTime));
        }else{
            this.updateWithPaddle();
        }
    }

    initVelocity() {
        this.inPlay = true;
        let angle = Math.random() * (Math.PI / 2) + (Math.PI / 4);
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(initialSpeed);
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(paddle.position.x+(paddle.width/2)-(this.width/2),
        paddle.position.y-this.height-2);
        this.velocity = new Vec(0, 0);
    }

    updateWithPaddle(){
        if(!this.inPlay){
            this.position.x= paddle.position.x+(paddle.width/2)-(this.width/2);
        }
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        if (this.position.x < 0) {
            this.position.x = 0
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
}

// An object to represent the box to be displayed
const box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 20, 20, "red");
const paddle = new Paddle(new Vec(((canvasWidth-100)/2), canvasHeight-40), 100, 20, "white");
const topBar = new GameObject(new Vec(0, 0), canvasWidth, 5, "black", "obstacle");
const leftBar = new GameObject(new Vec(0, 0), 5, canvasHeight, "black", "obstacle");
const rightBar = new GameObject(new Vec(canvasWidth-20, 0), 5, canvasHeight, "black", "obstacle");
const goal = new GameObject(new Vec(0, canvasHeight-20), canvasWidth, 1, "black", "goal");
const label = new TextLabel(50, 50, "40px Ubuntu Mono", "white")
const scoreLabel= new TextLabel(canvasWidth-220, 50, "40px Ubuntu Mono", "white")


function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    createBlocks();
    box.reset();

    createEventListeners();

    drawScene(0);
}

function createEventListeners() {
    window.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowLeft' || event.key =='a') {
            paddle.velocity = new Vec(-paddleVelocity, 0);
        } else if (event.key == 'ArrowRight' || event.key =='d') {
            paddle.velocity = new Vec(paddleVelocity, 0);
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key == 'a' || event.key == 'ArrowLeft' || event.key == 'd' || event.key == 'ArrowRight') {
            paddle.velocity = new Vec(0, 0);
        } 
        if (event.key == 'r' && !box.inPlay) {
            box.initVelocity();
        }
    });
}

function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw a square
    label.draw(ctx, `Vidas: ${Lifes}`);
    scoreLabel.draw(ctx, `Bloques: ${blocksDestroyed}`);
    goal.draw(ctx);
    topBar.draw(ctx);
    leftBar.draw(ctx);
    rightBar.draw(ctx);
    paddle.draw(ctx);
    box.draw(ctx);

    blocks.forEach(block => {
        if (block.active !== false) {
            block.draw(ctx);
        }
    });

    //console.log(`DeltaTime: ${deltaTime}`);
    // Update the properties of the object
    box.update(deltaTime);
    paddle.update(deltaTime);

    if (boxOverlap(box, paddle)){
        box.velocity.y *= -1;
        // box.velocity = box.velocity.times(speedIncrease);
    }
    if (boxOverlap(box, topBar)) {
        box.velocity.y *= -1;
        //box.velocity = box.velocity.times(speedIncrease);
    }
    if (boxOverlap(box, rightBar) || boxOverlap(box, leftBar)) {
        box.velocity.x *= -1;
        //box.velocity = box.velocity.times(speedIncrease);
    }
    if (boxOverlap(box, goal)) {
        Lifes -= 1;
        if(Lifes<=0){
            alert("GAME OVER)");
            Lifes=3;
            blocksDestroyed=0;
            createBlocks();
        }
        box.reset();
    }

    //Colisiones pelota con bloques
    blocks.forEach(block=> {
        if (block.active!== false && boxOverlap(box, block)){
            block.active= false;
            box.velocity.y*= -1;
            blocksDestroyed++;
        }
    });

    let activeBlocks= blocks.filter(block=> block.active!==false).length;
    if (activeBlocks===0) {
        alert("YOU WIN!");
        //Extra: Aumentar el número de filas para el nuevo nivel
        rows= Math.min(rows+ 1, 10); //Máximo de 15 filas
        createBlocks();
        Lifes=3;
        box.reset();
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
