const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  console.log("  Type 'r' for Rock");
  console.log("  Type 'p' for Paper");
  console.log("  Type 's' for Scissors");
  console.log("  Type 'q' to quit");
  console.log("  Type 'h' for a list of valid commands\n");
 
}

function getWinner(move1, move2) {
  if (move1 === move2){
    return 0;
  } else if (
    (move1 === 'r' && move2 === 's') ||
    (move1 === 's' && move2 === 'p') ||
    (move1 === 'p' && move2 === 'r')
  ) {
    return 1;
  } else {
    return -1;
  }
}

function getCPUMove(object) {
  const validMoves = Object.keys(object);
  const randomIndex = Math.floor(Math.random() * 2);

  return validMoves[randomIndex];
}

function processMove(cmd, cpu) {
  let result = '';
  if (cmd === cpu){
    result = 'You tie.\n';
  } else if (
    (cmd === 'r' && cpu === 's') ||
    (cmd === 's' && cpu === 'p') ||
    (cmd === 'p' && cpu === 'r') 
  ) {
    result = 'You win!\n';
  } else {
    result = 'You lose...\n';
  }
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);
  console.log(result);
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      console.log("\nHelp:\n");
      printHelp();
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]){
      const cpu = getCPUMove(VALID_MOVES);

      processMove(cmd, cpu);

      if (getWinner(cmd, cpu) === 0){
        ties++;
      } else if (getWinner(cmd, cpu) === 1){
        wins++;
      } else {
        losses++;
      }
    } else {
      console.log("\nInvalid command.\n");
      printHelp();
    }
    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};