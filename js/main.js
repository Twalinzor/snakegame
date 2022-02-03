 const canvas = document.getElementById("canvas")
 const ctx = canvas.getContext("2d")

 // game loop (gets quicker the more food you eat))

 const startButton = document.getElementById("startButton")
 startButton.onclick = () => {
    startButton.remove();
    drawGame();
 }

 const bgMusic = new Audio("./sounds/bgmusic1.mp3");
 const glup = new Audio("./sounds/glup1.mp3");

 let gameOver = false;

 //const glupSound = new Audio("../sounds/glup1.mp3");
 //const bgMusic = new Audio("../sounds/bgmusic1.mp3");
 
 let speed = 7;
 let score = 0;

 let squareCount = 20;
 let squareSize = canvas.width / squareCount - 2; 
 let snakeHeadX = 10; 
 let snakeHeadY = 10;

 let xSpeed = 0;
 let ySpeed = 0;

 let foodX = 5;
 let foodY = 5;

 class SnakeParts{ // ??
     constructor(x, y) {
         this.x = x;
         this.y = y;
     }
 }

 const snakeParts = []; // the snek
 let snakeTailLength = 2; // at start


 function drawGame () { // Draw game function spam
    bgMusic.play();
    changeSnakePosition(); 
     let result = isGameOver();
     if(result){
         return;
     }
    clearScreen(); 
    checkFoodCollision();       
    drawFood(); 
    drawSnake(); 
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

    if (gameOver) { // Turn music off and restart game and "restart button"
       bgMusic.pause() 
       let tryButton = document.querySelector(".hidden")
       tryButton.classList.toggle("hidden")
       tryButton.onclick = () =>{
        tryButton.classList.add("hidden")
        location.reload()

       }; 
    }

    return gameOver; // self explanatory
}

 function drawScore(){ // Score at the corner
     ctx.fillStyle = 'white';
     ctx.font = '12px Comfortaa'
     ctx.fillText("Score: " + score, canvas.width - 65, 15)
 }

 function clearScreen(){ // self explanatory
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 }

 function drawSnake() { // Drawing snek on canvas
     ctx.fillStyle= '#FDBDFF';
     for(let i = 0; i < snakeParts.length; i++) {
         let part = snakeParts[i];
         ctx.fillRect(part.x * squareCount, part.y * squareCount, squareSize, squareSize)
     }

     snakeParts.push(new SnakeParts(snakeHeadX, snakeHeadY)); // adding snek parts
     while (snakeParts.length > snakeTailLength) {
         snakeParts.shift();
     }

     ctx.fillStyle = '#C304C8 '; // snek head
     ctx.fillRect(snakeHeadX * squareCount, snakeHeadY * squareCount, squareSize, squareSize);
 }

 function drawFood(){ // food
     ctx.fillStyle = '#0030FC';
     ctx.fillRect(foodX * squareCount, foodY * squareCount, squareSize, squareSize);
 }


 function checkFoodCollision(){ // when eats, play glup sound
     if(foodX === snakeHeadX && foodY === snakeHeadY) {
         foodX = Math.floor(Math.random() * squareCount);
         foodY = Math.floor(Math.random() * squareCount);
         snakeTailLength ++;
         score ++;
         glup.play();
     }
 }


 function changeSnakePosition() { // snek too fast
     snakeHeadX = snakeHeadX + xSpeed;
     snakeHeadY = snakeHeadY + ySpeed;
 }

 document.body.addEventListener('keydown', keyDown);

 function keyDown(event){ // Movement stuff
    event.preventDefault()
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


