// A function for the computer's play
let computerSelection;
function getComputerChoice() {
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

// A function that plays a single round 
let playerSelection;
let outcome;
function playRound(playerSelection, computerSelection) {

    // Gets player's selection for the first argument and makes it case in-sensitive
    playerSelection = prompt('Make your choice! Rock, Paper, or Scissors?', 'shoot...').toLowerCase();
    console.log(playerSelection);

    // Passing getComputerChoice() for the second argument to playRound()
    computerSelection = getComputerChoice();
    console.log(computerSelection);

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
    // Returning the round outcome so the game() function can keep score, below
    return outcome;
}

// A function that plays five rounds and keeps score
function game() {
    let round;
    let computerScore = 0;
    let playerScore = 0;

    // Using a while loop to play the best of five rounds of playRound()
    let i = 1
    while (i <= 5) {
        round = i;
        playRound();

        // Changing the scores depending on the outcome of each round
        // A round does not count if it was a draw or the player input an invalid word
        if (outcome.includes(!'Sorry')) {
            continue
        } else if (outcome.includes('Yay!')) {
            computerScore += 0;
            playerScore += 1;
            i++;
        } else if (outcome.includes('Oh no!')) {
            computerScore += 1;
            playerScore += 0;
            i++;
        } 

        // Declaring the outcome and score of each round
        console.log(`The scores are: Computer ${computerScore}, Player ${playerScore}!`);
        alert(outcome);
    }

    // Declaring an ultimate winner
    let winner;
    if (computerScore < playerScore) { 
        winner = `And the winner is... You, the player! With a final score of ${playerScore} vs. ${computerScore}.`
    } else if (computerScore > playerScore) { 
        winner = `And the winner is... The computer! With a final score of ${computerScore} vs. ${playerScore}.`
    } else {
        winner = `It\'s a tie! ${computerScore} vs. ${playerScore}. How did that happen...?`
    }
    console.log(winner);
    alert(winner);
}

game();