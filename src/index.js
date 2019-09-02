/**
 * * We need to organize our code:
 * Factory & Modules
 * ? How to determine whene we need one of them?
 * ==============================
 * * The status of my code:
 * - 5 Global variables
 * - 2 helper functions
 * - 2 Global event handlers
 * ==============================
 * * Content of the code:
 * ...
 * ==============================
 * * Let's define a module. We want to return an object which contain a set of behaviors & props
 * ? what sort of objects can extract from our app?
 * an object is a special type thats represent a real world variable
 * It has properties and it can do things, like a "car"
 * ? do we have this kind of object here?
 * =============================
 * ? what can do things and/or have properties in this code?
 * - board: "boardState", "isWinner()", "restart()"
 * - square: "innerHTML", is clearly a child of "board"
 * ? why do we need to manage players?
 * The idea is to have "gameBoard" & "displayController" as a Module, and "players" as a Factory
 * * In "react" we think components:
 * - every piece of UI is its own component (Class or function-stateless)
 */

import gameBoard from './modules/gameboard';
import './style.css';

const gameStatus = document.getElementById('game-status');
const restart = document.getElementById('restart');
const root = document.getElementById('root');

let nextIsX = true;

gameBoard.render(root);
const board = document.getElementById('board');

board.onclick = (e) => {
  const square = e.target;

  if (square.className !== 'square' || square.innerHTML || gameBoard.isWinner()) return;

  const squareIndex = square.dataset.index;
  const value = nextIsX ? 'X' : 'O';

  gameBoard.add(squareIndex, value);

  if (gameBoard.isWinner()) {
    gameStatus.innerHTML = `Congratulation to player: ${square.innerHTML}`;
    return;
  }

  if (gameBoard.get().indexOf(null) === -1) {
    gameStatus.innerHTML = 'It\' a tie!';
    return;
  }

  nextIsX = !nextIsX;
  gameStatus.innerHTML = nextIsX ? 'Next player: X' : 'Next player: O';

  if (!restart.style.display) restart.style.display = 'block';
};

const reset = () => {
  gameStatus.innerHTML = 'Next player: X';
  nextIsX = true;
};

restart.onclick = () => {
  gameBoard.reset();
  reset();
};
