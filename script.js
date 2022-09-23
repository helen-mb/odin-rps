const gameBoard = document.getElementById('gameBoard');
const startGame = document.getElementById('startGame');
// A function to set up the game board
let playGame = function () {
    // The start button replaces itself with an instruction and a new set of play buttons 
    gameBoard.removeChild(startGame);
    const newP = document.createElement('p');
    const instruction = document.createTextNode('Choose your weapon!');
    newP.appendChild(instruction);
    gameBoard.appendChild(newP);
    // Creates the buttons that initiate a round
    // The rock button
    const rockButton = document.createElement('button');
    const rock = document.createTextNode('rock')
    rockButton.setAttribute('id', 'rock');
    rockButton.appendChild(rock);
    gameBoard.appendChild(rockButton);
    // The paper button
    const paperButton = document.createElement('button');
    const paper = document.createTextNode('paper')
    paperButton.setAttribute('id', 'paper');
    paperButton.appendChild(paper);
    gameBoard.appendChild(paperButton);
    // The scissors button
    const scissorsButton = document.createElement('button');
    const scissors = document.createTextNode('scissors')
    scissorsButton.setAttribute('id', 'scissors');
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
}
// Adding an event listener to the start button so it sets up the game board when clicked
startGame.addEventListener('click', playGame);

// A function for the computer's action
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

// A function that plays a single round and returns the round outcome
let outcome;
function playRound(playerSelection, computerSelection) {
    // Creating a div for displaying the players' choices inside the gameBoard:
//xxx This creates a new div every round whereas I only need one div... maybe a "start game" function can do it?
    const choiceDisplay = document.createElement('div'); 
    // Displaying the competing choices as a new paragraph in the choiceDisplay div:
    const competingChoices = document.createElement('p');
    const choicesText = document.createTextNode(`You chose "${playerSelection}" -- The computer chose "${computerSelection}"!`);
    competingChoices.appendChild(choicesText);
    choiceDisplay.appendChild(competingChoices);
    gameBoard.appendChild(choiceDisplay);

    // Using a switch statement to concatenate the opposing selections into winning or losing combinations
    switch(playerSelection + computerSelection) {
        case 'rockROCK':
        case 'paperPAPER':
        case 'scissorsSCISSORS':
            outcome = 'Sorry, it\'s a Draw. :?'
            break;
        case 'rockPAPER':
            outcome = 'Oh no! Paper beats rock! :('
            break;
        case 'rockSCISSORS':
            outcome = 'Yay! Rock beats scissors! :D'
            break;
        case 'paperROCK':
            outcome = 'Yay! Paper beats rock! :D'
            break;
        case 'paperSCISSORS':
            outcome = 'Oh no! Scissors beats paper! :('
            break;
        case 'scissorsROCK':
            outcome = 'Oh no! Rock beats scissors! :('
            break;
        case 'scissorsPAPER':
            outcome = 'Yay! Scissors beats paper! :D'
            break;
        default:
            outcome = 'Sorry, what was that? :?';
    }
    const outcomeReport = document.createElement('p');
    const outcomeText= document.createTextNode(outcome);
    outcomeReport.appendChild(outcomeText);
    gameBoard.appendChild(outcomeReport);
    // Returning the round outcome so the playGame() function can keep score, below
    return outcome;
}

// A function that keeps score for up to 5 rounds
let computerScore = 0;
let playerScore = 0;
function updateScore() {
    // Changing the scores depending on the outcome of each round
    // A round does not count if it was a draw or the player input an invalid word
    if (outcome.includes('Yay!')) {
        computerScore += 0;
        playerScore += 1;
    } else if (outcome.includes('Oh no!')) {
        computerScore += 1;
        playerScore += 0;
    }
        
    // Declaring the outcome and score of each round
//xxx This creates a new div every round whereas I only need one div... maybe a "start game" function can do it?
    const scoreBoard = document.createElement('div'); 
    // Displaying the updated scores as a new paragraph in the choiceDisplay div:
    const scores = document.createElement('p');
    const scoreValues = document.createTextNode(`The scores are: Computer ${computerScore}, Player ${playerScore}!`);
    scores.appendChild(scoreValues);
    scoreBoard.appendChild(scores);
    gameBoard.appendChild(scoreBoard);
    
    // Declaring an ultimate winner
    let winner;
    if (playerScore === 5 || computerScore === 5) {
        if (playerScore > computerScore) { 
            winner = `And the winner is... You, the player! With a final score of ${playerScore} vs. ${computerScore}.`
        } else if (computerScore > playerScore) { 
            winner = `And the winner is... The computer! With a final score of ${computerScore} vs. ${playerScore}.`
        } else {
            winner = "Uh, what just happened?"
        }
        alert(winner);
    }
}