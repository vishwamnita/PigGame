/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScore, activePlayer, gamePlaying,prevRoll,winningValue;
init();
document.querySelector('.btn-roll').addEventListener('click',function() {
    if(gamePlaying){
        // 1. Get Random number
        var dice = Math.ceil(Math.random() * 6);
        var diceNew = Math.ceil(Math.random() * 6);
        // 2. Display the Result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        var diceDomNew = document.querySelector('.dice-new');
        diceDomNew.style.display = 'block';
        diceDomNew.src = 'dice-' + diceNew + '.png';
        // 3. Update the round score if the rolled number was not 1
        if(prevRoll === 6 && dice === 6){
            // Set Score to 0
            document.querySelector('#score-' + activePlayer).textContent = '0';
            score [activePlayer] = 0;

            // Next Player
            nextPlayer();
        }
        else if(dice !== 1) {
            //Add the score
            roundScore += dice + diceNew;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } 
        else if(diceNew === 1 || dice === 1 ) {
            // Next Player
            nextPlayer();
        }
        prevRoll = dice;
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
        // ADD current Score to GLOBAL Score
        score [activePlayer] += roundScore;

        // Updat the UI
        document.querySelector('#score-' + activePlayer).textContent = score [activePlayer];

        //Check if the player won the game
        if(score [activePlayer] >= winningValue){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-new').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;        
        }
        else {
            // Next Player
            nextPlayer();
        }
    }    
});

function nextPlayer() {
    //Next Player
    //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-new').style.display = 'none';
    //document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click',init);

function init() {
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    prevRoll = 0;
    winningValue = document.querySelector('.winning-score').value;
    if(!winningValue){
        winningValue=100;
    }
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-new').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}






//document.querySelector('#current-' + activePlayer).textContent =  dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice '</em>';
//var x = document.querySelector('#score-0').textContent;







































