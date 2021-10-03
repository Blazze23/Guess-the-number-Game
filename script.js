'use strict';

// Variables
let secretNumber = Math.trunc(Math.random() * 20 + 1); // Generating 1-20 number
let score = 20;
let highscore = 0;
// console.log(secretNumber);

// Node elements
const messageNodeEl = document.querySelector('.message');
const scoreNodeEl = document.querySelector('.score');
const numberNodeEl = document.querySelector('.number');
const bodyNodeEl = document.querySelector('body');
const headingNodeEl = document.querySelector('.heading');
const guessNodeEl = document.querySelector('.guess');
const highscoreNodeEl = document.querySelector('.highscore');
const checkNodeEl = document.querySelector('.check');
const againNodeEl = document.querySelector('.again');

// Changing message according to gameplay
function changeMessage(message) {
  messageNodeEl.textContent = message;
}

// Changing score according to gameplay
function chageScore(score) {
  scoreNodeEl.textContent = score;
}

// Switching ? to Number and back to ?
function changeNumber(number) {
  numberNodeEl.textContent = number;
}

// Switching styles for winning and reset
function changeStyles(bg, w, heading) {
  bodyNodeEl.style.backgroundColor = bg;
  numberNodeEl.style.width = w;
  headingNodeEl.textContent = heading;
}

// New game reset - Again button logic
function startNewGame() {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  // console.log(secretNumber);
  score = 20;
  chageScore(20);
  guessNodeEl.value = '';
  changeMessage('Start guessing...');
  changeNumber('?');
  changeStyles('#0b0355', '15rem', "What's the Number!");
}

// Input reset when guess is not valid
function inputReset(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0 || input.value > 20) {
    input.value = '';
  }
}

// Checking if screen size is mobile - so that we can reset input on wrong guess, so that you don't have to erase previous guess, while on large screens you can change guess value on the input itself
const isMobile = function () {
  const width = window.innerWidth;
  if (width <= 700) return true;
};
isMobile();

// Check button logic
function checkValue() {
  const guess = Number(guessNodeEl.value);
  // console.log(guess);

  // Case 1 - when there is no input
  if (!guess) {
    changeMessage('⛔ No Number! ');
  }

  // Case 2 - when player wins
  else if (secretNumber === guess) {
    changeMessage('🎉 Correct Number! ');
    changeNumber(secretNumber);
    changeStyles('#FDB927', '20rem', '🏆 YOU WON !!!');

    // Cheking and setting highscore
    if (score > highscore) {
      highscore = score;
      highscoreNodeEl.textContent = highscore;
    }
  }

  // Case 3 - when the guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      changeMessage(guess > secretNumber ? '📈 Too High' : '📉 Too Low');
      score--;
      chageScore(score);

      // Reseting input on mobile
      if (isMobile()) guessNodeEl.value = '';
    } else if (score === 1) {
      score--;
      chageScore(score);
      changeMessage('😭 You lost the game');
      changeStyles('#070807', '15rem', 'GAME OVER !!!');
    } else if (score === 0) {
      chageScore(score);
    }
  }
}
// Adding Check button listener
checkNodeEl.addEventListener('click', checkValue);

//  Adding Again buttton listener
againNodeEl.addEventListener('click', startNewGame);

// Adding Input listener
guessNodeEl.addEventListener('change', inputReset);

// Adding Enter key listener to check button
document.addEventListener('keydown', function (event) {
  const enterButton = event.key;
  if (enterButton === 'Enter') checkValue();
});

// Adding screen width listener - so that we can reset input on mobile when the guess is wrong
window.addEventListener('resize', isMobile);
