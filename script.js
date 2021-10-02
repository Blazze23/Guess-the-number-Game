'use strict';

let secretNumber = Math.trunc(Math.random() * 20 + 1); // Generating 1-20 number
let score = 20;
let highscore = 0;
// console.log(secretNumber);

// Changing message according to gameplay
function changeMessage(message) {
  document.querySelector('.message').textContent = message;
}

// Changing score according to gameplay
function chageScore(score) {
  document.querySelector('.score').textContent = score;
}

// Switching ? to Number and back to ?
function changeNumber(number) {
  document.querySelector('.number').textContent = number;
}

// Switching styles for winning and reset
function changeStyles(bg, w, heading) {
  document.querySelector('body').style.backgroundColor = bg;
  document.querySelector('.number').style.width = w;
  document.querySelector('.heading').textContent = heading;
}

// Check number Logic ✅
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
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
      document.querySelector('.highscore').textContent = highscore;
    }
  }

  // Case 3 - when the guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      changeMessage(guess > secretNumber ? '📈 Too High' : '📉 Too Low');
      score--;
      chageScore(score);
    } else if (score === 1) {
      score--;
      chageScore(score);
      changeMessage('😭 You lost the game');
      changeStyles('#070807', '15rem', 'GAME OVER !!!');
    } else if (score === 0) {
      chageScore(score);
    }
  }
});

//  Again buttton logic - reseting all
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  // console.log(secretNumber)
  score = 20;
  chageScore(20);
  document.querySelector('.guess').value = '';
  changeMessage('Start guessing...');
  changeNumber('?');
  changeStyles('rgb(11, 3, 85', '15rem', 'Guess the Number!');
});

// Input change event
document.querySelector('.guess').addEventListener('change', function (event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0 || input.value > 20) {
    input.value = '';
  }
});
