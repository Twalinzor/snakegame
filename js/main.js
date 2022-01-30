 const canvas = document.getElementById("canvas")
 const ctx = canvas.getContext("2d")

 // game loop (request animation, set interval, set timeout(gets quicker the more food you eat))

 let speed = 7;
 let score = 0;

 let squareCount = 20;
 let squareSize = canvas.width / squareCount - 2; // in case we want to change size later
 let snakeHeadX = 10; 
 let snakeHeadY = 10;

 let xSpeed = 0;
 let ySpeed = 0;

 let foodX = 5;
 let foodY = 5;

 class SnakeParts{ // to "snake.js"
     constructor(x, y) {
         this.x = x;
         this.y = y;
     }
 }

 const snakeParts = []; // to "snake.js"
 let snakeTailLength = 2;


 function drawGame () { // to "game.js"
    changeSnakePosition(); // to "snake.js"
     let result = isGameOver();
     if(result){
         return;
     }
    clearScreen(); // to "game.js"
    checkFoodCollision();       
    drawFood(); // to "snake.js"
    drawSnake(); // to "food.js"
    drawScore();

    if(score > 2){
        speed = 11;
    }

    if(score > 5) {
        speed = 15;
    }

    setTimeout(drawGame, 1000 / speed); // initial speed
}

function isGameOver(){
    let gameOver = false;

    if(ySpeed === 0 && xSpeed === 0){
        return false;
    }

    if(snakeHeadX < 0){
        gameOver = true;
    } else if(snakeHeadX === squareCount) {
        gameOver = true;
    } else if(snakeHeadY < 0){
        gameOver = true;
    } else if(snakeHeadY === squareCount) {
        gameOver = true;
    }

    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === snakeHeadX && part.y === snakeHeadY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.fillText("GAME OVER!!!", canvas.width / 18, canvas.height / 2)
    }

    return gameOver;
}

 function drawScore(){
     ctx.fillStyle = 'white';
     ctx.font = '12px verdana'
     ctx.fillText("Score: " + score, canvas.width - 65, 15)
 }

 function clearScreen(){ // to "game.js"
     ctx.fillStyle = 'black';
     ctx.fillRect(0, 0, canvas.width, canvas.height);
 }

 function drawSnake() { // to "snake.js"
     ctx.fillStyle= 'yellow';
     for(let i = 0; i < snakeParts.length; i++) {
         let part = snakeParts[i];
         ctx.fillRect(part.x * squareCount, part.y * squareCount, squareSize, squareSize)
     }

     snakeParts.push(new SnakeParts(snakeHeadX, snakeHeadY));
     while (snakeParts.length > snakeTailLength) {
         snakeParts.shift();
     }

     ctx.fillStyle = 'blue';
     ctx.fillRect(snakeHeadX * squareCount, snakeHeadY * squareCount, squareSize, squareSize);
 }

 function drawFood(){
     ctx.fillStyle = 'red';
     ctx.fillRect(foodX * squareCount, foodY * squareCount, squareSize, squareSize);
 }


 function checkFoodCollision(){
     if(foodX === snakeHeadX && foodY === snakeHeadY) {
         foodX = Math.floor(Math.random() * squareCount);
         foodY = Math.floor(Math.random() * squareCount);
         snakeTailLength ++;
         score ++;
         glupSound.play();
     }
 }


 function changeSnakePosition() {
     snakeHeadX = snakeHeadX + xSpeed;
     snakeHeadY = snakeHeadY + ySpeed;
 }

 document.body.addEventListener('keydown', keyDown);

 function keyDown(event){
     if(event.keyCode === 38) { // KEY UP
        if(ySpeed === 1) return; // PREVENTS FROM CRUSHING INTO OWN BODY
         ySpeed = -1;
         xSpeed = 0;
     }

     if(event.keyCode === 40) { // KEY DOWN
        if(ySpeed === -1) return; // PREVENTS FROM CRUSHING INTO OWN BODY
        ySpeed = 1;
        xSpeed = 0;
    }

    if(event.keyCode === 37) { // KEY LEFT
        if(xSpeed === 1) return; // PREVENTS FROM CRUSHING INTO OWN BODY
        ySpeed = 0;
        xSpeed = -1;
    }

    if(event.keyCode === 39) { // KEY RIGHT
        if(xSpeed === -1) return; // PREVENTS FROM CRUSHING INTO OWN BODY
        ySpeed = 0;
        xSpeed = 1;
    }
 }

 drawGame();
