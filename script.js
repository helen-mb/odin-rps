// Setting variables...
// Variables of elements that ALREADY EXIST:
const gameBoard = document.getElementById('gameBoard');
const startGame = document.getElementById('startGame');
// Things that WILL BE ADDED to the gameBoard once the startGame button is pressed:
// An instruction to replace the startGame button (gets appended by startGame)
const instruction = document.createElement('p');
const instructionText = document.createTextNode('Choose your weapon!');
instruction.appendChild(instructionText);
// the rock button (gets appended by startGame)
const rockButton = document.createElement('button');
const rock = document.createTextNode('rock');
rockButton.setAttribute('id', 'rock');
rockButton.appendChild(rock);
// the paper button (gets appended by startGame)
const paperButton = document.createElement('button');
const paper = document.createTextNode('paper');
paperButton.setAttribute('id', 'paper');
paperButton.appendChild(paper);
// the scissors button (gets appended by startGame)
const scissorsButton = document.createElement('button');
const scissors = document.createTextNode('scissors')
scissorsButton.setAttribute('id', 'scissors');
scissorsButton.appendChild(scissors);
// a div for displaying the players' choices and some commentary inside the gameBoard (gets appended by startGame)
const outcomeDisplay = document.createElement('div');
outcomeDisplay.setAttribute('id', 'outcomeDisplay'); 
const outcomeReport = document.createElement('p');
outcomeReport.setAttribute('id', 'outcomeReport');
outcomeDisplay.appendChild(outcomeReport);
const outcomeCommentary = document.createElement('p');
outcomeCommentary.setAttribute('id', 'outcomeCommentary')
outcomeDisplay.appendChild(outcomeCommentary);
// a div for displaying the scores inside the gameBoard (gets appended by startGame)
const scoreBoard = document.createElement('div'); 
scoreBoard.setAttribute('id', 'scoreBoard');
const scores = document.createElement('p');
scores.setAttribute('id', 'scores');
scoreBoard.appendChild(scores);
// a div for displaying the game history inside the gameBoard (gets appended by startGame)
const playBack = document.createElement('div'); 
playBack.setAttribute('id', 'playBack');

// A function to set up the game board
const playGame = function () {
    // The start button replaces itself with an instruction and a new set of play buttons 
    gameBoard.removeChild(startGame);
    gameBoard.appendChild(instruction);
    // Appends the rock button to the DOM
    gameBoard.appendChild(rockButton);
    // Appends the paper button to the DOM
    gameBoard.appendChild(paperButton);
    // Appends the scissors button to the DOM
    gameBoard.appendChild(scissorsButton);
    // Appends the remaining sections of the gameBoard
    gameBoard.appendChild(outcomeDisplay);
    gameBoard.appendChild(scoreBoard);
    gameBoard.appendChild(playBack);
    // Adding an event listener to the BUTTONS that initiates a round, and collects the player and computer's selections
    const playButtons = document.querySelectorAll('button');
    playButtons.forEach(button => {
        button.addEventListener('click', event => {
            playerSelection = event.target.id;
            playRound(playerSelection, getComputerSelection());
            updateScore();
        })
    })
}

// Adding an event listener to the start button so it sets up the game board when clicked
startGame.addEventListener('click', playGame);

// A function to generate the computer's selection
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
    // Returning the computerSelection to be used in the playRound() function, below
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
    // Displaying the competing choices in the outcomeDisplay div
    document.getElementById("outcomeReport").innerHTML = `You chose "${playerSelection}" -- The computer chose "${computerSelection}"!`;
    // Display the commentary in the outcomeDisplay div
    document.getElementById("outcomeCommentary").innerHTML = `${commentary}`;
    // Returning the round commentary so the playGame() function can keep score, below
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
    
    // Once a score reaches 5, a winner is declared
    if (playerScore === 5 || computerScore === 5) {
        // Declaring the ultimate winner
        if (playerScore > computerScore) { 
            winner = `And the winner is... You, the player! With a final score of ${playerScore} vs. ${computerScore}.`
        } else if (computerScore > playerScore) { 
            winner = `And the winner is... The computer! With a final score of ${computerScore} vs. ${playerScore}.`
        } else {
            winner = "Uh, what just happened?"
        }
        alert(winner);        
        // Removing the buttons once a winner is declared.
        const playButtons = document.querySelectorAll('button');
        playButtons.forEach(button => gameBoard.removeChild(button))
        gameBoard.removeChild(instruction);
    }
}