/**
 * We need to declare a winner:
 * We must know the state of the board in every turn
 * So, the state of every square must be saved in the board
 * we must provide a 'button' to 'start the game' and empty the board
 * how/where can we save the board state? Array? Object? Array of objects?
 * Maybe we need to set data attributes for the squares...
 * Now we can detect which of the squares gets clicked and save it accordingly
 */
import './style.css';

const board = document.getElementById('board');
const gameStatus = document.getElementById('game-status');
const restart = document.getElementById('restart');

let nextIsX = true;
const boardState = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: '',
};

const isWinner = (obj) => {
  const possibilities = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  return possibilities.some((arr) => obj[arr[0]] && obj[arr[0]]
  === obj[arr[1]] && obj[arr[0]]
  === obj[arr[2]]);
};

board.onclick = (e) => {
  const square = e.target;

  if (square.className !== 'square' || square.innerHTML || isWinner(boardState)) return;

  square.innerHTML = nextIsX ? 'X' : 'O';
  boardState[square.dataset.index] = square.innerHTML;

  if (isWinner(boardState)) {
    gameStatus.innerHTML = `Congratulation to player: ${square.innerHTML}`;
    return;
  }

  nextIsX = !nextIsX;
  gameStatus.innerHTML = nextIsX ? 'Next player: X' : 'Next player: O';

  if (!restart.style.display) restart.style.display = 'block';
};

restart.onclick = () => {
  Object.keys(boardState).map((key) => {
    boardState[key] = '';
    return key;
  });
  Array.from(board.querySelectorAll('.square')).map((square) => {
    square.innerHTML = '';
    return square;
  });
  gameStatus.innerHTML = 'Next player: X';
  nextIsX = true;
  console.log(boardState);
};
