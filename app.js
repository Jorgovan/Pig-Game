/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceNumber;


var lastSix = false;
var isPlaying = true;
activePlayer = 0;
diceNumber = 1;



var diceDOM = document.querySelector('.dice');
var dice1DOM = document.getElementById('dice-1');
var dice2DOM = document.getElementById('dice-2');
dice1DOM.style.display = 'none';
dice2DOM.style.display = 'none';



function newGame() {
    
    document.getElementById('name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');


    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    isPlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

}

function nextPlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';       
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastSix = false;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}


newGame();



document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if (isPlaying) {
        if (diceNumber === 1) {
            // rand numb//
            var dice = Math.floor(Math.random() * 6) + 1;

            //display result
            diceDOM.style.display='block';
            diceDOM.src = 'dice-' + dice + '.png';

            if (dice !== 1) {
                //If there are two 6 in a row, score goes to 0
                if (lastSix && dice === 6) {
                    scores[activePlayer] = 0;
                    document.getElementById('score-'+activePlayer).textContent = '0';
                    nextPlayer();
                } else {
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                }
            } else {
                diceDOM.src = 'dice-1.png';
                nextPlayer();
             }
            dice === 6? lastSix = true : lastSix = false;
        } else {
            
            var dice1 = Math.floor(Math.random()*6)+1;
            var dice2 = Math.floor(Math.random()*6)+1;
            
            console.log(dice1);
            console.log(dice2);
            var dices = dice1+dice2;
            console.log(dices);
            
            //display result
            dice1DOM.style.display='block';
            dice1DOM.src = 'dice-' + dice1 + '.png';
            dice2DOM.style.display='block';
            dice2DOM.src = 'dice-' + dice2 + '.png';
            
            if (dice1===1 || dice2 === 1) {
                scores[activePlayer]=0;
                document.getElementById('score-'+activePlayer).textContent = '0';
                nextPlayer();            
            }   else {
                roundScore += dices;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                
                
            }

            
            
            
            
        }

    }
    
    
    

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if (isPlaying) {    
        scores[activePlayer]+=roundScore;

        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
        
        var winningScore = parseInt(document.querySelector('.finalScore').value, 10);

        if (!winningScore) {    winningScore=100;}
        
        if (scores[activePlayer] >= winningScore) {
            isPlaying = false;
            document.querySelector('.dice').style.display = 'none';
            document.getElementById('name-'+activePlayer).textContent = 'Winner!!!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer +'-panel').classList.remove('active');

        } else {
            nextPlayer();
        }}
    
});

document.querySelector('.btn-new').addEventListener('click', function() {
    newGame();
});


diceDOM.addEventListener('click', function() {
    diceDOM.style.display = 'none';
    dice1DOM.style.display = 'block';
    dice2DOM.style.display = 'block';
    
    dice1DOM.src = 'dice-1.png';
    dice2DOM.src = 'dice-1.png';

    
    diceNumber = 2;
});

dice1DOM.addEventListener('click', function() {
    diceDOM.style.display = 'block';
    dice1DOM.style.display = 'none';
    dice2DOM.style.display = 'none';
    
    diceDOM.src = 'dice-1.png';

    
    diceNumber = 1;
});


