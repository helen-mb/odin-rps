// Setting variables...
// Variables of elements that ALREADY EXIST:
const gameBoard = document.getElementById('gameBoard');
const game = document.getElementById('game');
// Things that WILL BE ADDED to the gameBoard once the startGame button is pressed:
// an instruction to replace the game button (gets appended by startGame; removed at game end)
const instruction = document.createElement('p');
const instructionText = document.createTextNode('Choose your weapon!');
instruction.appendChild(instructionText);
// the rock button (gets appended by startGame; removed at game end)
const rockButton = document.createElement('button');
const rock = document.createTextNode('rock');
rockButton.setAttribute('id', 'rock');
rockButton.appendChild(rock);
// the paper button (gets appended by startGame; removed at game end)
const paperButton = document.createElement('button');
const paper = document.createTextNode('paper');
paperButton.setAttribute('id', 'paper');
paperButton.appendChild(paper);
// the scissors button (gets appended by startGame; removed at game end)
const scissorsButton = document.createElement('button');
const scissors = document.createTextNode('scissors')
scissorsButton.setAttribute('id', 'scissors');
scissorsButton.appendChild(scissors);
// Things that WILL BE MODIFIED based on playRound outcomes:
// a div for displaying round outcomes + commentary inside the gameBoard (gets appended by startGame; modified by playRound)
const outcomeDisplay = document.createElement('div');
outcomeDisplay.setAttribute('id', 'outcomeDisplay'); 
const outcomeReport = document.createElement('p');
outcomeReport.setAttribute('id', 'outcomeReport');
outcomeDisplay.appendChild(outcomeReport);
const outcomeCommentary = document.createElement('p');
outcomeCommentary.setAttribute('id', 'outcomeCommentary')
outcomeDisplay.appendChild(outcomeCommentary);
// a div for displaying the scores inside the gameBoard (gets appended by startGame; modified by playRound)
const scoreBoard = document.createElement('div'); 
scoreBoard.setAttribute('id', 'scoreBoard');
const scores = document.createElement('p');
scores.setAttribute('id', 'scores');
scoreBoard.appendChild(scores);
// Things that WILL BE ADDED at the end of the game:
// a div for displaying the game history inside the gameBoard (gets appended by endGame; modified by playRound)
const gameHistory = document.createElement('div'); 
gameHistory.setAttribute('id', 'gameHistory');
const playBack = document.createElement('ol');
playBack.setAttribute('id', 'playBack');
gameHistory.appendChild(playBack);

// A function to set up the game board
const startGame = function () {
    // The start button replaces itself with an instruction and a new set of game buttons 
    gameBoard.removeChild(game);
    gameBoard.appendChild(instruction);
    // Appends the game buttons to the DOM
    gameBoard.appendChild(rockButton);
    gameBoard.appendChild(paperButton);
    gameBoard.appendChild(scissorsButton);
    // Appends the remaining sections of the gameBoard
    gameBoard.appendChild(outcomeDisplay);
    gameBoard.appendChild(scoreBoard);
    // Adds an event listener to the BUTTONS that initiates a round, and collects the player and computer's selections
    const gameButtons = document.querySelectorAll('button');
    gameButtons.forEach(button => {
        button.addEventListener('click', event => {
            let playerSelection = event.target.id;
            playRound(playerSelection, getComputerSelection());
            updateScore();
        })
    })
}

// A function for ENDING THE GAME:
const endGame = function () {
    // Once a score reaches 5, a winner is declared, the buttons are removed, and the gameHistory gets appended
    if (playerScore > computerScore) { 
        winner = `And the winner is... You, the player! With a final score of ${playerScore} vs. ${computerScore}.`
    } else if (computerScore > playerScore) { 
        winner = `And the winner is... The computer! With a final score of ${computerScore} vs. ${playerScore}.`
    } else {
        winner = "Uh, what just happened?"
    }       
    const gameButtons = document.querySelectorAll('button');
    gameButtons.forEach(button => gameBoard.removeChild(button));
    gameBoard.removeChild(instruction);
    gameBoard.appendChild(gameHistory);
    alert(winner); 
}

// Adding an event listener to the start button that runs the startGame function (sets up the game board) when clicked
game.addEventListener('click', startGame);

// A function to generate the computer's selection for the playRound function
let computerSelection;
function getComputerSelection() {
    computerSelection = Math.floor(Math.random() * 3) + 1;
    // Converting numerical values into string values    
    if (computerSelection == 1) {
        computerSelection = 'ROCK';
    } else if (computerSelection == 2) {
        computerSelection = 'PAPER';
    } else {
        computerSelection = 'SCISSORS';
    }
    return computerSelection;
}

// A function that plays a single round and returns the round outcome and appropriate commentary
let commentary;
function playRound(playerSelection, computerSelection) {
    // Using a switch statement to concatenate the opposing selections into winning or losing combinations
    switch(playerSelection + computerSelection) {
        case 'rockROCK':
        case 'paperPAPER':
        case 'scissorsSCISSORS':
            commentary = 'Sorry, it\'s a Draw. :?'
            break;
        case 'rockPAPER':
            commentary = 'Oh no! Paper beats rock! :('
            break;
        case 'rockSCISSORS':
            commentary = 'Yay! Rock beats scissors! :D'
            break;
        case 'paperROCK':
            commentary = 'Yay! Paper beats rock! :D'
            break;
        case 'paperSCISSORS':
            commentary = 'Oh no! Scissors beats paper! :('
            break;
        case 'scissorsROCK':
            commentary = 'Oh no! Rock beats scissors! :('
            break;
        case 'scissorsPAPER':
            commentary = 'Yay! Scissors beats paper! :D'
            break;
        default:
            commentary = 'Sorry, what was that? :?';
    }
    // Displaying the competing choices and some commentary in the outcomeDisplay div
    const outcomeText = `You chose "${playerSelection}" -- The computer chose "${computerSelection}"!`
    document.getElementById("outcomeReport").innerHTML = `${outcomeText}`;
    document.getElementById("outcomeCommentary").innerHTML = `${commentary}`;
    // Adding the outcomeText to the gameHistory's playBack list (get appended to the gameHistory section by endGame)
    const playBackRound = document.createElement('li');
    const playBackText = document.createTextNode(`${outcomeText}`);
    playBackRound.appendChild(playBackText);
    playBack.appendChild(playBackRound);
    // Returning the round commentary so the updateScore() function can keep score
    return commentary;
}

// A function that keeps score for up to 5 rounds
let computerScore = 0;
let playerScore = 0;
let winner = null;
function updateScore() {
    // Changing the scores depending on the commentary of each round
    if (commentary.includes('Yay!')) {
        computerScore += 0;
        playerScore += 1;
    } else if (commentary.includes('Oh no!')) {
        computerScore += 1;
        playerScore += 0;
    }
    // Displaying the updated scores in the scoreBoard div:
    document.getElementById("scores").innerHTML = (`The scores are: Computer ${computerScore}, Player ${playerScore}!`);
    if (playerScore === 5 || computerScore === 5) {
        endGame()
    };
}