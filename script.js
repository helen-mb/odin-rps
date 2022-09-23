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

// For the player's action:
// Allowing the buttons to initiate playRound(), capture the player's selection, and pass the playRound() arguments
const playButtons = document.getElementsByClassName('playButton');
let playerSelection;
for (i=0; i<playButtons.length; i++) {
    // *** Adding an event listener to the buttons that starts a round and gathers the id of the button pressed
    playButtons.item(i).addEventListener('click', event => {
        playerSelection = event.target.id;
        playRound(playerSelection, getComputerSelection());
        updateScore();
    })
}

const gameBoard = document.getElementById('gameBoard');
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
    // Returning the round outcome so the game() function can keep score, below
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
    

    /* // Declaring an ultimate winner
    let winner;
    if (computerScore < playerScore) { 
        winner = `And the winner is... You, the player! With a final score of ${playerScore} vs. ${computerScore}.`
    } else if (computerScore > playerScore) { 
        winner = `And the winner is... The computer! With a final score of ${computerScore} vs. ${playerScore}.`
    } else {
        winner = `It\'s a tie! ${computerScore} vs. ${playerScore}. How did that happen...?`
    }
    console.log(winner);
    alert(winner); */
}

//game();