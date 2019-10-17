import xMark from '../images/x-mark.svg';
import oMark from '../images/o-mark.svg';
import boardSVG from '../images/board.svg';

const gameBoard = (function gameBoard() {
  const gameboard = Array(9).fill(null);
  const board = document.createElement('ul');
  const boardWrapper = document.createElement('div');
  let lastIndex = null;

  const add = (index, value) => {
    lastIndex = index;
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

  const renderSvgBoard = () => {
    boardWrapper.insertAdjacentHTML('afterBegin', boardSVG);
    boardWrapper.querySelector('#svg-board').style.opacity = 1;
    boardWrapper.querySelector('#svg-board #svg-board-line1').style.strokeDashoffset = getComputedStyle(boardWrapper.querySelector('#svg-board #svg-board-line1')).strokeDasharray;
    boardWrapper.querySelector('#svg-board #svg-board-line2').style.strokeDashoffset = getComputedStyle(boardWrapper.querySelector('#svg-board #svg-board-line2')).strokeDasharray;
    boardWrapper.querySelector('#svg-board #svg-board-line3').style.strokeDashoffset = getComputedStyle(boardWrapper.querySelector('#svg-board #svg-board-line3')).strokeDasharray;
    boardWrapper.querySelector('#svg-board #svg-board-line4').style.strokeDashoffset = getComputedStyle(boardWrapper.querySelector('#svg-board #svg-board-line4')).strokeDasharray;
  };

  /**
   * Render the "board"
   * @param {HTMLElement} root The root HTML element where our "board"  will reside
   */
  const render = (root) => {
    board.id = 'board';
    boardWrapper.id = 'board-wrapper';
    gameboard.forEach(
      (square, i) => board.insertAdjacentHTML('beforeEnd', `<li class="square" data-index=${i}>${xMark}${oMark}</li>`),
    );
    boardWrapper.append(board);
    root.append(boardWrapper);
    renderSvgBoard();
  };

  const reset = () => {
    gameboard.fill(null);
    board.querySelectorAll('li').forEach((li) => {
      if (li.querySelector('.svg-x-mark').style.opacity) {
        li.querySelector('.svg-x-mark').style.opacity = '';
        li.querySelector('.svg-x-mark .path-x-1').style.strokeDashoffset = '';
        li.querySelector('.svg-x-mark .path-x-2').style.strokeDashoffset = '';
      }

      if (li.querySelector('.svg-o-mark').style.opacity) {
        li.querySelector('.svg-o-mark').style.opacity = '';
        li.querySelector('.svg-o-mark .path-o-mark').style.strokeDashoffset = '';
      }
    });
    // board svg
    document.getElementById('svg-board').remove();
    renderSvgBoard();
  };

  const drawWinLine = (combination) => {
    switch (`${combination}`) {
      case '0,1,2':
        document.getElementById('win-line1').style.opacity = 1;
        document.getElementById('win-line1').style.strokeDashoffset = 0;
        break;
      case '3,4,5':
        document.getElementById('win-line2').style.opacity = 1;
        document.getElementById('win-line2').style.strokeDashoffset = 0;
        break;
      case '6,7,8':
        document.getElementById('win-line3').style.opacity = 1;
        document.getElementById('win-line3').style.strokeDashoffset = 0;
        break;
      case '0,4,8':
        document.getElementById('win-line4').style.opacity = 1;
        document.getElementById('win-line4').style.strokeDashoffset = 0;
        break;
      case '2,4,6':
        document.getElementById('win-line5').style.opacity = 1;
        document.getElementById('win-line5').style.strokeDashoffset = 0;
        break;
      case '0,3,6':
        document.getElementById('win-line6').style.opacity = 1;
        document.getElementById('win-line6').style.strokeDashoffset = 0;
        break;
      case '1,4,7':
        document.getElementById('win-line7').style.opacity = 1;
        document.getElementById('win-line7').style.strokeDashoffset = 0;
        break;
      case '2,5,8':
        document.getElementById('win-line8').style.opacity = 1;
        document.getElementById('win-line8').style.strokeDashoffset = 0;
        break;
      default:
    }
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

    let combination = null;

    const state = possibilities.some((arr) => {
      const test = gameboard[arr[0]] && gameboard[arr[0]] === gameboard[arr[1]] && gameboard[arr[0]]
      === gameboard[arr[2]];

      if (test) {
        combination = arr;
      }

      return test;
    });

    if (state) drawWinLine(combination);

    return state;
  };

  const get = () => gameboard;

  const getHTMLBoard = () => board;

  const getLastIndex = () => lastIndex;

  return {
    add,
    render,
    reset,
    isWinner,
    get,
    getHTMLBoard,
    getLastIndex,
  };
}());

export default gameBoard;
