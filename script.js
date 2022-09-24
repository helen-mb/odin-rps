const gameBoard = document.getElementById('gameBoard');
const startGame = document.getElementById('startGame');
let winner = null;
// creating the rock button but not appending it to the DOM yet
const rockButton = document.createElement('button');
const rock = document.createTextNode('rock');
rockButton.setAttribute('id', 'rock');
// creating the paper button but not appending it to the DOM yet
const paperButton = document.createElement('button');
const paper = document.createTextNode('paper');
paperButton.setAttribute('id', 'paper');
// creating the paper button but not appending it to the DOM yet
const scissorsButton = document.createElement('button');
const scissors = document.createTextNode('scissors')
scissorsButton.setAttribute('id', 'scissors');

// A function to set up the game board
let playGame = function () {
    // The start button replaces itself with an instruction and a new set of play buttons 
    gameBoard.removeChild(startGame);
    const newP = document.createElement('p');
    const instruction = document.createTextNode('Choose your weapon!');
    newP.appendChild(instruction);
    gameBoard.appendChild(newP);
    // Appends the rock button
    rockButton.appendChild(rock);
    gameBoard.appendChild(rockButton);
    // Appends the paper button
    paperButton.appendChild(paper);
    gameBoard.appendChild(paperButton);
    // Appends the scissors button
    scissorsButton.appendChild(scissors);
    gameBoard.appendChild(scissorsButton);

    // Adding an event listener to the buttons that initiates a round, and collects the player and computer's selections
    let playButtons = document.querySelectorAll('button');
    playButtons.forEach(button => {;
        button.addEventListener('click', event => {
            playerSelection = event.target.id;
            playRound(playerSelection, getComputerSelection());
            updateScore();
        })
    })

    // Creating a div for displaying the players' choices inside the gameBoard:
    const outcomeDisplay = document.createElement('div');
    outcomeDisplay.setAttribute('id', 'outcomeDisplay'); 
    gameBoard.appendChild(outcomeDisplay);

    // Creating a div for displaying the scores inside the gameBoard:
    const scoreBoard = document.createElement('div'); 
    scoreBoard.setAttribute('id', 'scoreBoard');
    gameBoard.appendChild(scoreBoard);

    // Creating a playback div for displaying the game history inside the gameBoard:
    const playBack = document.createElement('div'); 
    playBack.setAttribute('id', 'playBack');
    gameBoard.appendChild(playBack);
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

    // Displaying the competing choices as a new paragraph in the outcomeDisplay div
    const outcomeReport = document.createElement('p');
    outcomeReport.setAttribute('id', 'outcomeReport');
    const reportText = document.createTextNode(`You chose "${playerSelection}" -- The computer chose "${computerSelection}"!`);
    outcomeReport.appendChild(reportText);
    outcomeDisplay.appendChild(outcomeReport);

    // Adding commentary on the round outcome in the outcomeDisplay div
    const outcomeCommentary = document.createElement('p');
    outcomeCommentary.setAttribute('id', 'outcomeCommentary')
    const commentaryText = document.createTextNode(commentary);
    outcomeCommentary.appendChild(commentaryText);
    outcomeDisplay.appendChild(outcomeCommentary);
    // Returning the round commentary so the playGame() function can keep score, below
    return commentary;
}

// A function that keeps score for up to 5 rounds
let computerScore = 0;
let playerScore = 0;
function updateScore() {
    // Changing the scores depending on the commentary of each round
    // A round does not count if it was a draw or the player input an invalid word
    if (commentary.includes('Yay!')) {
        computerScore += 0;
        playerScore += 1;
    } else if (commentary.includes('Oh no!')) {
        computerScore += 1;
        playerScore += 0;
    }
        
    // Displaying the updated scores as a new paragraph in the outcomeDisplay div:
    const scores = document.createElement('p');
    scores.setAttribute('id', 'scores');
    const scoreValues = document.createTextNode(`The scores are: Computer ${computerScore}, Player ${playerScore}!`);
    scores.appendChild(scoreValues);
    scoreBoard.appendChild(scores);
    
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
        gameBoard.removeChild(rockButton);
        gameBoard.removeChild(paperButton);
        gameBoard.removeChild(scissorsButton);
    }
}