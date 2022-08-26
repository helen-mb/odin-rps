// Your game is going to play against the computer, 
// so begin with a function called getComputerChoice 
// that will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’. 
// We’ll use this function in the game to make the computer’s play.

// Write a function that plays a single round of Rock Paper Scissors. 
// The function should take two parameters - the playerSelection and computerSelection 
// - and then return a string that declares the winner of the round 
// like so: "You Lose! Paper beats Rock"

// Make your function’s playerSelection parameter case-insensitive 
// (so users can input rock, ROCK, RocK or any other variation).
// Important note: you want to return the results of this function call, not console.log() them. 
// You’re going to use what you return later on, 
// but let’s test this function by using console.log to see the results.

// Write a NEW function called game(). 
// Call the playRound function inside of this one to play a 5 round game 
// that keeps score and reports a winner or loser at the end.

// At this point you should be using console.log() to display 
// the results of each round and the winner at the end.
// Use prompt() to get input from the user. 
// --



// A function for computer's play: 'getComputerChoice()'
//    Returns either 'Rock' 'Paper' or 'Scissors'
//    (* Probably involves random number generation; 1, 2, or 3?)

let computerSelection;

function getComputerChoice() {
    computerSelection = Math.floor(Math.random() * 3) + 1;
//  * converting numerical value into string values -- may not be necessary in this function    
//    if (computerSelection == 1) {
//        computerSelection = 'ROCK';
//    }
//    else if (computerSelection == 2) {
//        computerSelection = 'PAPER';
//    }
//    else {
//        computerSelection = 'SCISSORS';
//    }
    return computerSelection;
}

// A function that plays a single round: 'playRound()' 
// Parameters: 'playerSelection', 'computerSelection'

let playerSelection;

function playRound(playerSelection, computerSelection) {
// Gets player's selection through prompt().
// Makes player's selection case IN-sensitive.
    playerSelection = prompt('Make your choice! Rock, Paper, or Scissors?', 'shoot...').toLowerCase();
//  * Passing getComputerChoice() as the second argument to playRound().
    computerSelection = getComputerChoice();
    console.log(computerSelection);
//  * Converting player's choice to numerical value - will compare to computer choice later
    if (playerSelection == 'rock') {
        playerSelection = 1;
    }
    else if (playerSelection == 'paper') {
        playerSelection = 2;
    }
    else if (playerSelection == 'scissors') {
        playerSelection = 3;
    }
    console.log(playerSelection);
//  * Determining winner by subtracting playerSelection from computerSelection
//    declares a winner by returning a string.
    let winner;
    if (playerSelection - computerSelection == 1 || playerSelection - computerSelection == -2) {
        winner = 'You Win! :D'
    }
    else if (playerSelection - computerSelection == -1 || playerSelection - computerSelection == 2) {
        winner = 'You lose. :('
    }
    else {
        winner = 'It\'s a Draw... :?'
    }
    alert(winner);
}

playRound();


// A function that plays five rounds: 'game()'
//    (*Loops may be a good choice)
//    and displays results of each round in the console
//    and keeps score to declare an ultimate winner or loser.

