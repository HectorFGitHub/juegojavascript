const canvas = document.querySelector ('#game');
const game = canvas.getContext ('2d');
const btnUp= document.querySelector('#up');
const btnLeft= document.querySelector('#left');
const btnRight= document.querySelector('#right');
const btnDown= document.querySelector('#down');
const spanLives= document.querySelector('#lives');
const spanTime= document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
const reset_button = document.querySelector('#reset_button');




let canvasSize;
let elementsSize;

let level=0;
let lives=3;
let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x:undefined,
    y:undefined,
};
const giftPosition={
    x:undefined,
    y:undefined,  
}
let enemyPositions=[];
     

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


function fixNumber(n){
return Number(n.toFixed(2));
}
function setCanvasSize(){
   
    if(window.innerHeight>window.innerWidth){
        canvasSize=window.innerWidth*0.7;
    } else {
    canvasSize=innerHeight*0.7;
    }
    canvasSize=Number(canvasSize.toFixed(0));
        canvas.setAttribute('width',canvasSize);
        canvas.setAttribute('height',canvasSize);
    
        elementsSize= canvasSize/10;
        playerPosition.x=undefined;
        playerPosition.y=undefined;
        startGame()
}

function startGame (){
   

    console.log ({ canvasSize, elementsSize});
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map= maps[level];
    if (!map){
        gameWin();
        return;
    }
    if(!timeStart){
timeStart=Date.now();
timeInterval= setInterval(showTime,100);
showRecord();
    }
    
    function gameWin(){
        window.alert('Terminaste el juego!');
        clearInterval(timeInterval);
        const recordTime=localStorage.getItem('record_time');
        const playerTime= Date.now()-timeStart;
      
        if(recordTime){
            
            if(recordTime >= playerTime){
                localStorage.setItem('record_time',playerTime); 
               pResult.innerHTML='superaste el record';   
                }else{
                    pResult.innerHTML='lo siento no superaste el record';
                }

                }else{
                  localStorage.setItem('record_time',playerTime) ; 
                  pResult.innerHTML='Primera vez? muy bien!,pero ahora trata de superar tu tiempo';
                }
                
                reset_button.addEventListener('click', resetGame);
                function resetGame() {
                    location.reload();
                }
            console.log({recordTime,playerTime});
    }
    
function showLives(){
    
   const heartsArray=Array(lives).fill(emojis['HEART'])//[1,2,3]
    //console.log(heartsArray);
    spanLives.innerHTML="";
    heartsArray.forEach(heart=>spanLives.append(heart));
    //spanLives.innerHTML= emojis['HEART'];

}
function showTime(){
spanTime.innerHTML= Date.now()-timeStart;
}
function showRecord(){
    spanRecord.innerHTML= localStorage.getItem('record_time');
    }
const mapRows= map.trim().split('\n');
const mapRowsCols = mapRows.map(row => row.trim().split(''));
console.log ({map, mapRows, mapRowsCols});
showLives();
enemyPositions= [];
game.clearRect(0,0,canvasSize, canvasSize);


mapRowsCols.forEach((row, rowI) =>
 {
    row.forEach((col, colI)=>{
    const emoji = emojis[col];
    const posX= elementsSize*(colI+1);
    const posY= elementsSize*(rowI+1);
    if (col=='O'){
        if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x=posX;
            playerPosition.y=posY;
            
        }    
    } else if (col =='I'){
        giftPosition.x =posX;
        giftPosition.y =posY;
    } else if (col =='X'){
        enemyPositions.push({
            x: posX,
            y: posY,
        });
    }

    game.fillText(emoji, posX, posY);

    
});

    
});
   //for (let row=1; row<=10; row++ ){
       // for(let col =1; col<=10; col++){
       // game.fillText(emojis[mapRowsCols[row-1][col-1]], elementsSize*col, elementsSize*row);
   // }
//}
movePlayer();
}
function movePlayer(){
    const giftCollisionX= playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY= playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision= giftCollisionX && giftCollisionY;
    
    if(giftCollision){
        levelWin();
        console.log('Subiste de nivel!');
    }
    function levelWin(){
        console.log('Subiste de nivel');
        level++;
        startGame();
    }
    
function levelFail(){
    lives --;
    
    window.alert("te quedan "+ lives+ "vidas");
    if(lives<=0){window.alert('chocaste contra un enemigo :(');
    
    
    level=0;
    lives=3;
    timeStart=undefined;

    }else {
        level=0;
       
    }
    playerPosition.x=undefined;
    playerPosition.y=undefined;
        startGame();
}

    const enemyCollision = enemyPositions.find(enemy=>{
        const enemyCollisionX= enemy.x.toFixed(3)== playerPosition.x.toFixed(3);
        const enemyCollisionY=enemy.y.toFixed(3)==playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
        
    });
    if(enemyCollision){
       levelFail();
    }

    game.fillText(emojis['PLAYER'] ,playerPosition.x, playerPosition.y);

}

window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event){
if (event.key =='ArrowUp'){
moveUp();
} else if( event.key == 'ArrowLeft'){
    moveLeft();
}else if( event.key == 'ArrowRight'){
    moveRight();
}else if( event.key == 'ArrowDown'){
    moveDown();
}}
function moveUp (){
console.log('me quiero mover hacia arriba');
if((playerPosition.y-elementsSize)<0){
    console.log('OUT');
} else{playerPosition.y-=elementsSize;
    startGame();

}

}
function moveLeft (){
    console.log('me quiero mover hacia la izquierda');
    if((playerPosition.x-elementsSize)<0){
        console.log('OUT');
    } else{playerPosition.x-=elementsSize;
        startGame();
    
    }
    
    }
function moveRight (){
        console.log('me quiero mover hacia la derecha');
        if((playerPosition.x+elementsSize)>canvasSize){
            console.log('OUT');
        } else{playerPosition.x+=elementsSize;
            startGame();
        
        }
        
        }
        function moveDown (){
            console.log('me quiero mover hacia abajo');
            if((playerPosition.y+elementsSize)>canvasSize){
                console.log('OUT');
            } else{playerPosition.y+=elementsSize;
                startGame();
            
            }
            
            }