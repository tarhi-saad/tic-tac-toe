/**
 * We want to create a 'Tic Tac Toe' game
 * We need a board which will contain 9 squares
 * when we click on a square it will show 'X' or 'O'
 */
import './style.css';

const board = document.getElementById('board');
const nextPlayer = document.getElementById('next-player');
let nextIsX = true;

board.onclick = (e) => {
  const square = e.target;

  if (square.className !== 'square' || square.innerHTML) return;

  square.innerHTML = nextIsX ? 'X' : 'O';
  nextIsX = !nextIsX;
  nextPlayer.innerHTML = nextIsX ? 'Next player: X' : 'Next player: O';
};
