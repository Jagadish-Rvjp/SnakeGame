const gameBoard = document.querySelector("#gameBoard");

var dontClick = document.getElementById("gameBoard");

dontClick.addEventListener("click", function(){
    alert("Don't Touch me B***h!!!");
});

const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameheight = gameBoard.height;

const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black" ;
const foodColor1 = "white";
const foodColor2 = "black";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX1;
let foodX2;
let foodY2;
let foodY1;
let score = 0;

var image = new Image();
image.src = "./Image/funnyfattiktoker.jpg"; 

let blendApplied = false;



let snake = [
  {x:unitSize *4, y:0},
  {x:unitSize *3, y:0},
  {x:unitSize *2, y:0},
  {x:unitSize, y:0},
  {x:0, y:0},
]

window.addEventListener("keydown",changeDirection);
resetBtn.addEventListener("click",resetGame);

gameStart();

function gameStart(){

  running = true;
  scoreText.textContent = score;

  createFood1();
  createFood2();

  drawFood1();
  drawFood2();

  nextTick();

};

function nextTick(){
if(running){
  setTimeout(()=>{

       clearBoard();
       
       drawFood1();
       drawFood2();
       moveSnake();
       drawSnake();
       checkGameOver();
       nextTick();

  }, 75);
  
  setTimeout(()=>{
    createFood1();
    createFood2();
  },5000)
  

  
}
else{
  displayGameOver();
}

};


function clearBoard(){

  drawImage(image,0,0,gameWidth,gameheight);

  

  function drawImage(src,x,y,w,h){
  ctx.drawImage(src,x,y,w,h);
  
  
  
  

 }

};


function createFood1(){
  function randomFood(min, max){
    const randNum = Math.round((Math.random()* (max - min) + min)/unitSize)* unitSize;
    return randNum;
  }
  foodX1 = randomFood(0,gameWidth - unitSize);
  foodY1 = randomFood(0,gameWidth - unitSize);
};

function createFood2(){
  function randomFood(min, max){
    const randNum = Math.round((Math.random()* (max - min) + min)/unitSize)* unitSize;
    return randNum;
  }
  foodX2 = randomFood(0,gameWidth - unitSize);
  foodY2 = randomFood(0,gameWidth - unitSize);
};

function drawFood1(){
  ctx.fillStyle = foodColor1;
  ctx.fillRect(foodX1,foodY1,unitSize,unitSize);

  
};

function drawFood2(){
  ctx.fillStyle = foodColor2;
  ctx.fillRect(foodX2,foodY2,unitSize,unitSize);
};



function moveSnake(){

  const head = {x: snake[0].x + xVelocity,
                y: snake[0].y + yVelocity}; 

  snake.unshift(head);
  if(snake[0].x == foodX1 && snake[0].y == foodY1)
  {
      score+=1;
      scoreText.textContent = score;
      createFood1();
      createFood2();
  }
 else{
  snake.pop();
 }



 if(snake[0].x == foodX2 && snake[0].y == foodY2)
 {
     score-=1;
     scoreText.textContent = score;
     snake.pop();   
     createFood2(); 
 }

};


function drawSnake(){
    
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;

  snake.forEach(snakePart => {

    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    
  })

};
function changeDirection(event){
  const keyPressed = event.keyCode;

  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
 
  const goingUp = (yVelocity == -unitSize);
  const goingDown = (yVelocity == unitSize);
  const goingLeft = (xVelocity == -unitSize);
  const goingRight = (xVelocity == unitSize);

  switch(true){
    case(keyPressed == LEFT && !goingRight): 
              xVelocity = -unitSize;
              yVelocity = 0;
              break;

    case(keyPressed == RIGHT && !goingLeft): 
              xVelocity = unitSize;
              yVelocity = 0;
              break;

    case(keyPressed == UP && !goingDown): 
              xVelocity = 0;
              yVelocity = -unitSize;
              break;

    case(keyPressed == DOWN && !goingDown): 
              xVelocity = 0;
              yVelocity = unitSize;
              break;        
  }

};

function checkGameOver(){
 switch(true)
 {
  case (snake[0].x < 0):
    running = false;
    break;

   case (snake[0].x >= gameWidth):
    running = false;
    break;

   case (snake[0].y < 0):
    running = false;
    break; 

    case (snake[0].y >= gameWidth):
      running = false;
      break;
 }

 if(snake.length==0)
 {

  alert("All you had to do was eat the White one CJ!");
  running = false;
 
 }

 



};

function displayGameOver(){

    alert("Even a 10 year old could've scored better than you!!");
    running = false;

};
function resetGame(){

  score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];

    gameStart();

};

