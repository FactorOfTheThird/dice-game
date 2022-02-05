'use strict';

// Elements
const SCORE_ONE_ELEMENT = document.getElementById('score--0');
const SCORE_TWO_ELEMENT = document.getElementById('score--1');
const DICE_ELEMENT = document.querySelector('.dice');

const PLR_ONE_ELEMENT = document.querySelector('.player--0');
const PLR_TWO_ELEMENT = document.querySelector('.player--1');

const CURR_SCORE_ONE_ELEMENT = document.getElementById('current--0');
const CURR_SCORE_TWO_ELEMENT = document.getElementById('current--1');

// Buttons
const BUTTON_NEW_GAME = document.querySelector('.btn--new');
const BUTTON_ROLL = document.querySelector('.btn--roll');
const BUTTON_HOLD = document.querySelector('.btn--hold');

// Variables
const SCORES = [0, 0];
const MAX_SCORE = 100;
let currScore = 0;
let activePlr = 0;
let playing = true;

// Function to dynamically change the current player's score display
function changeCurrScore(val) {
  activePlr === 0
    ? (CURR_SCORE_ONE_ELEMENT.textContent = val)
    : (CURR_SCORE_TWO_ELEMENT.textContent = val);
}

function changeTotalScore(val) {
  activePlr === 0
    ? (SCORE_ONE_ELEMENT.textContent = val)
    : (SCORE_TWO_ELEMENT.textContent = val);
}

function changeActivePlr() {
  changeCurrScore(0);
  currScore = 0;

  activePlr = activePlr === 0 ? 1 : 0;

  // Change visuals
  PLR_ONE_ELEMENT.classList.toggle('player--active');
  PLR_TWO_ELEMENT.classList.toggle('player--active');
}

// Function to reset the game
function resetGame() {
  SCORE_ONE_ELEMENT.textContent = 0;
  SCORE_TWO_ELEMENT.textContent = 0;
  DICE_ELEMENT.classList.add('hidden');

  CURR_SCORE_ONE_ELEMENT.textContent = 0;
  CURR_SCORE_TWO_ELEMENT.textContent = 0;

  PLR_ONE_ELEMENT.classList.remove('player--winner');
  PLR_ONE_ELEMENT.classList.add('player--active');

  PLR_TWO_ELEMENT.classList.remove('player--winner');
  PLR_TWO_ELEMENT.classList.remove('player--active');

  activePlr = 0;
  currScore = 0;
  SCORES[0] = 0;
  SCORES[1] = 0;

  playing = true;
}

resetGame();

// Event for when dice rolls
BUTTON_ROLL.addEventListener('click', e => {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  DICE_ELEMENT.classList.remove('hidden');
  DICE_ELEMENT.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currScore += dice;

    changeCurrScore(currScore);
  } else {
    changeActivePlr();
  }
});

BUTTON_HOLD.addEventListener('click', e => {
  if (!playing) return;

  // Just incase you wanna keep your... 0 score.
  if (currScore === 0) return;

  SCORES[activePlr] += currScore;

  changeTotalScore(SCORES[activePlr]);

  if (SCORES[activePlr] >= MAX_SCORE) {
    console.log(`Player ${activePlr} wins!`);

    switch (activePlr) {
      case 0:
        PLR_ONE_ELEMENT.classList.add('player--winner');
        PLR_ONE_ELEMENT.classList.remove('player--active');
        break;
      case 1:
        PLR_TWO_ELEMENT.classList.add('player--winner');
        PLR_TWO_ELEMENT.classList.remove('player--active');
        break;
      default:
        console.log('Something went wrong');
    }

    playing = false;
    DICE_ELEMENT.classList.add('hidden');
  } else {
    changeActivePlr();
  }
});

BUTTON_NEW_GAME.addEventListener('click', e => {
  resetGame();
});
