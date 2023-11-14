
const playBoard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");

let footX;
let footY;

let gameOver = false;

let snakeX=9;
let snakeY=3;

let snakeBody=[];

let velocityX=0;
let velocityY=0;

let setIntervalId;

let score=0;

let highScore = localStorage.getItem(".high-score") || 0;
highScoreElement.innerHTML=`Puntuacion maxima : ${highScore}`;

function handleGameOver(){
    clearInterval(setIntervalId);
 alert("Game Over");
 location.reload();

}

function changeFoodPosition(){
    footX=Math.floor(Math.random() * 15) +1;
    footY=Math.floor(Math.random() * 15) +1;

}

function changeDirection(e){



if(e.key==="ArrowUp" && velocityY !=1){
    velocityX=0;
    velocityY=-1;

}
else if(e.key==="ArrowDown" && velocityY != -1){
    velocityX=0;
    velocityY=1;

}
else if(e.key==="ArrowLeft" && velocityX !=1){
    velocityX= -1;
    velocityY=0;

}
else if(e.key==="ArrowRight" && velocityX !=-1){
    velocityX= 1;
    velocityY= 0;

}
//initGame();

}



function initGame(){
if(gameOver) return handleGameOver();




let htmlMarkup =` <div class="food" style="grid-area:${footY} /${footX}" ></div>`;

 if(snakeX===footX && snakeY===footY){
    changeFoodPosition();
    snakeBody.push([footX,footY]);
    score++;
       highScore=score >= highScore ? score: highScore;
       localStorage.setItem("high-score", highScore);
    scoreElement.innerHTML=`Puntos : ${score}`;
    highScoreElement.innerHTML=`Puntuacion maxima : ${highScore}`;

   

 }

for(let i=snakeBody.length -1; i>0; i--){

    snakeBody[i]= snakeBody[i-1];
}



snakeBody[0]=[snakeX,snakeY]
snakeX+=velocityX;
snakeY+=velocityY;

if(snakeX <=0  || snakeX >15 || snakeY <=0  || snakeY >15){
   gameOver=true;
}

for(let i= 0; i<snakeBody.length; i++){

    htmlMarkup +=` <div class="head" style="grid-area:${ snakeBody[i][1]} /${snakeBody[i][0]}" ></div>`;
    if(i !==0 && snakeBody[0][1] ===snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0] ){

        gameOver=true;
    }
}

htmlMarkup +=` <div class="head" style="grid-area:${ snakeY} /${snakeX}" ></div>`;
playBoard.innerHTML=htmlMarkup;
}


changeFoodPosition();
setIntervalId=setInterval(initGame,125 );

document.addEventListener("keydown",changeDirection)