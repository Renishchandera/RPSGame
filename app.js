const startGame = document.getElementById('start-game');
const nextMove = document.getElementById('next-move');
const endGame = document.getElementById('end-game');
const restartGame = document.getElementById('restart-game');
let userMoveImg = document.getElementById('user-move-img');
let botMoveImg = document.getElementById('bot-move-img');
let result = document.getElementById('result');
startGame.style.display = 'initial';
endGame.style.display = 'none';
restartGame.style.display = 'none';
startGame.addEventListener('click', gameStart);
restartGame.addEventListener('click', gameRestart);
endGame.addEventListener('click', gameEnd);
nextMove.addEventListener('click', displayOptions);
let winner = null;
let userScore = document.getElementById('user-score');
let botScore = document.getElementById('bot-score');
const userOptions = document.getElementsByClassName("user-selection");
let userOptionsArray = Array.from(userOptions);
let animationBox = document.getElementById('animation-box');
let gif = animationBox.appendChild(document.createElement('img'));
gif.id = "animation-gif";
// let userMoveCard = document.getElementById('user-move');
// let botMoveCard = document.getElementById('bot-move');
const rpsArray = ["rock", "paper", "scissor"];
// let selectPrompt = document.getElementById('select-prompt');

function gameStart() {
    // let startAudio = document.getElementById('game-start-audio');
    // startAudio.play();
  
    restartGame.style.display = 'none';
    startGame.style.display = 'none';
    endGame.style.display = 'initial';

    // startAnimation();

    // selectPrompt.style.display = 'initial';

    // userOptionsArray.forEach(element => {
    //     element.addEventListener('click',playerMoves);
    // });

    for (let i = 0; i < 3; i++) {
        userOptionsArray[i].addEventListener('click', function playerMoves() {
            userMove(userOptionsArray.indexOf(userOptionsArray[i]));
            let botIndex = botMove(userOptionsArray.indexOf(userOptionsArray[i]));
            compare(userOptionsArray.indexOf(userOptionsArray[i]), botIndex);
            if(nextMove.style.display != 'initial'){
                nextMove.style.display = 'initial'
                // selectPrompt.style.display = 'none';
            }
            for (let i = 0; i < 3; i++) {
                userOptionsArray[i].style.display = 'none';
            }
         
        })
    }


}




function gameEnd() {
    if(+(userScore.innerText) > +(botScore.innerText)){
        result.innerText = `You Won !!\nyour score :${userScore.innerText},\nbot score : ${botScore.innerText}`;
        startWinAnimation(winner);
    }else if(+(userScore.innerText) < +(botScore.innerText)){
        result.innerText = `You Lost! Better luck next time!! \nyour score : ${userScore.innerText}, \nbot score : ${botScore.innerText}`;
        startLoseAnimation(winner);
    }else{
        result.innerText = `Tied !! \nyour score : ${userScore.innerText},\nbot score : ${botScore.innerText}`;
    }
    startGame.style.display = 'none';
    endGame.style.display = 'none';
    restartGame.style.display = 'initial';
    nextMove.style.display = 'none';
    // selectPrompt.style.display = 'none';
    for (let i = 0; i < 3; i++) {
        userOptionsArray[i].style.display = 'none';
    }
    // let startAudio = document.getElementById('game-start-audio');
    // startAudio.pause();
}

function gameRestart() {
    // let startAudio = document.getElementById('game-start-audio');
    // startAudio.play();

    userScore.innerText = 0;
    botScore.innerText = 0;
    for (let i = 0; i < 3; i++) {
        userOptionsArray[i].style.display = 'flex';
    }
    endGame.style.display = 'initial';
    restartGame.style.display = 'none';
    // selectPrompt.style.display = 'initial';
    // userMoveCard.style.width = '0';
    // botMoveCard.style.width = '0';
    userMoveImg.style.width = '0';
    botMoveImg.style.width = '0';
    userMoveImg.style.height = '0';
    botMoveImg.style.height = '0';
    alert("Game Restarted !!");
    result.innerText = "Select Your Move";
    gif.src = "";
    gif.style.left = '-500px';
}
function userMove(index) {
    userMoveImg.src = `images/${rpsArray[index]}.png`;
    // userMoveCard.innerText = rpsArray[index];
    // userMoveCard.style.width = 'auto';
    userMoveImg.style.width = '9rem';
    userMoveImg.style.height = '9rem';
    return index;
}
function botMove(index) {
    let botIndex = Math.floor(Math.random() * 3);
    botMoveImg.src = `images/${rpsArray[botIndex]}.png`;
    // botMoveCard.innerText = rpsArray[botIndex];
    // botMoveCard.style.width = 'auto';
    botMoveImg.style.width = '9rem';
    botMoveImg.style.height = '9rem';
    return botIndex;
}

function compare(index, botIndex) {
    if (index == botIndex) {
        winner = 'tie';
       result.innerText = "Tied !! Try Again!";
    } else if (rpsArray[index] == "rock" && rpsArray[botIndex] == "paper") {
        winner = "bot";
        result.innerText = "You Loose !! Bot Wins !! Better Luck Next Time";
    } else if (rpsArray[index] == "rock" && rpsArray[botIndex] == "scissor") {
        winner = "user";
        result.innerText = "Yehh ! You Won !!!";
    } else if (rpsArray[index] == "paper" && rpsArray[botIndex] == "rock") {
        winner = "user";
        result.innerText = "Yehh ! You Won !!!";
    } else if (rpsArray[index] == "paper" && rpsArray[botIndex] == "scissor") {
        winner = "bot";
        result.innerText = "You Loose !! Bot Wins !! Better Luck Next Time";
    } else if (rpsArray[index] == "scissor" && rpsArray[botIndex] == "rock") {
        winner = "bot";
        result.innerText = "You Loose !! Bot Wins !! Better Luck Next Time";
    } else if (rpsArray[index] == "scissor" && rpsArray[botIndex] == "paper") {
        winner = "user";
        result.innerText = "Yehh ! You Won !!!";
    } else {
        result.innerText = "Sorry! there was an issue! please try again";
    }


    if (winner == "user") {
        startWinAnimation(winner);
        (userScore.innerText)++;
    } else if (winner == "bot") {
        startLoseAnimation();
        (botScore.innerText)++;
    }else{
       // startTieAnimation();
    }
}

function displayOptions(){
    for (let i = 0; i < 3; i++) {
        userOptionsArray[i].style.display = 'flex';
    }
    // selectPrompt.style.display = 'initial';
    userMoveImg.style.width = '0';
    botMoveImg.style.width = '0';
    userMoveImg.style.height = '0';
    botMoveImg.style.height = '0';
    result.innerText = "";
    gif.src = "";
    gif.style.left = '-500px';
}


function startWinAnimation(winner){
    gif.src = "video/win.gif"
    gif.style.left = '0px';
}
function startLoseAnimation(){
    gif.src = "video/smalllose.gif";
    gif.style.left = '0px';
}
