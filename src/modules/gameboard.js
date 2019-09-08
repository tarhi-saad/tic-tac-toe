import xMark from '../images/x-mark.svg';
import oMark from '../images/o-mark.svg';

const gameBoard = (function gameBoard() {
  const gameboard = Array(9).fill(null);
  const board = document.createElement('ul');

  const add = (index, value) => {
    gameboard[index] = value;

    if (value === 'X') {
      board.querySelectorAll('li')[index].querySelector('.svg-x-mark').style.opacity = 1;
      board.querySelectorAll('li')[index].querySelector('.svg-x-mark .path-x-1').style.strokeDashoffset = 73;
      board.querySelectorAll('li')[index].querySelector('.svg-x-mark .path-x-2').style.strokeDashoffset = 67;
    } else {
      board.querySelectorAll('li')[index].querySelector('.svg-o-mark').style.opacity = 1;
      board.querySelectorAll('li')[index].querySelector('.svg-o-mark .path-o-mark').style.strokeDashoffset = 173;
    }
  };

  /**
   * Render the "board"
   * @param {HTMLElement} root The root HTML element where our "board"  will reside
   */
  const render = (root) => {
    board.id = 'board';
    gameboard.forEach(
      (square, i) => board.insertAdjacentHTML('beforeEnd', `<li class="square" data-index=${i}>${xMark}${oMark}</li>`),
    );
    root.append(board);
  };

  const reset = () => {
    gameboard.fill(null);
    board.querySelectorAll('li').forEach((li) => {
      li.querySelector('.svg-x-mark').style.opacity = 0;
      li.querySelector('.svg-x-mark .path-x-1').style.strokeDashoffset = 0;
      li.querySelector('.svg-x-mark .path-x-2').style.strokeDashoffset = 0;
      li.querySelector('.svg-o-mark').style.opacity = 0;
      li.querySelector('.svg-o-mark .path-o-mark').style.strokeDashoffset = 0;
    });
  };

  const isWinner = () => {
    const possibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return possibilities.some((arr) => gameboard[arr[0]]
      && gameboard[arr[0]] === gameboard[arr[1]]
      && gameboard[arr[0]] === gameboard[arr[2]]);
  };

  const get = () => gameboard;

  const getHTMLBoard = () => board;

  return {
    add,
    render,
    reset,
    isWinner,
    get,
    getHTMLBoard,
  };
}());

export default gameBoard;
