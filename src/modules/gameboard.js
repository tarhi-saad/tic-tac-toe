import xMark from '../images/x-mark.svg';
import oMark from '../images/o-mark.svg';
import boardSVG from '../images/board.svg';

const gameBoard = (function gameBoard() {
  const gameboard = Array(9).fill(null);
  const board = document.createElement('ul');
  let rootElement = null;

  const add = (index, value) => {
    gameboard[index] = value;
    const li = board.querySelectorAll('li')[index];

    if (value === 'X') {
      li.querySelector('.svg-x-mark').style.opacity = 1;
      li.querySelector('.svg-x-mark .path-x-1').style.strokeDashoffset = getComputedStyle(li.querySelector('.svg-x-mark .path-x-1')).strokeDasharray;
      li.querySelector('.svg-x-mark .path-x-2').style.strokeDashoffset = getComputedStyle(li.querySelector('.svg-x-mark .path-x-2')).strokeDasharray;
    } else {
      li.querySelector('.svg-o-mark').style.opacity = 1;
      li.querySelector('.svg-o-mark .path-o-mark').style.strokeDashoffset = getComputedStyle(li.querySelector('.svg-o-mark .path-o-mark')).strokeDasharray;
    }
  };

  const renderSvgBoard = (root) => {
    root.insertAdjacentHTML('afterBegin', boardSVG);
    root.querySelector('#svg-board').style.opacity = 1;
    root.querySelector('#svg-board #svg-board-line1').style.strokeDashoffset = getComputedStyle(root.querySelector('#svg-board #svg-board-line1')).strokeDasharray;
    root.querySelector('#svg-board #svg-board-line2').style.strokeDashoffset = getComputedStyle(root.querySelector('#svg-board #svg-board-line2')).strokeDasharray;
    root.querySelector('#svg-board #svg-board-line3').style.strokeDashoffset = getComputedStyle(root.querySelector('#svg-board #svg-board-line3')).strokeDasharray;
    root.querySelector('#svg-board #svg-board-line4').style.strokeDashoffset = getComputedStyle(root.querySelector('#svg-board #svg-board-line4')).strokeDasharray;
  };

  /**
   * Render the "board"
   * @param {HTMLElement} root The root HTML element where our "board"  will reside
   */
  const render = (root) => {
    rootElement = root;
    board.id = 'board';
    gameboard.forEach(
      (square, i) => board.insertAdjacentHTML('beforeEnd', `<li class="square" data-index=${i}>${xMark}${oMark}</li>`),
    );
    root.append(board);
    renderSvgBoard(rootElement);
  };

  const reset = () => {
    gameboard.fill(null);
    board.querySelectorAll('li').forEach((li) => {
      li.querySelector('.svg-x-mark').style.opacity = 0;
      li.querySelector('.svg-x-mark .path-x-1').style.strokeDashoffset = 0;
      li.querySelector('.svg-x-mark .path-x-2').style.strokeDashoffset = 0;
      li.querySelector('.svg-o-mark').style.opacity = 0;
      li.querySelector('.svg-o-mark .path-o-mark').style.strokeDashoffset = 0;
      // board svg
      document.getElementById('svg-board').remove();
      renderSvgBoard(rootElement);
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
