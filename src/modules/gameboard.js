const gameBoard = (function gameBoard() {
  const gameboard = Array(9).fill(null);
  const board = document.createElement('ul');

  const add = (index, value) => {
    gameboard[index] = value;
    board.querySelectorAll('li')[index].innerHTML = value;
  };

  /**
   * Render the "board"
   * @param {HTMLElement} root The root HTML element where our "board"  will reside
   */
  const render = (root) => {
    board.id = 'board';
    gameboard.forEach(
      (square, i) => board.insertAdjacentHTML('beforeEnd', `<li class="square" data-index=${i}></li>`),
    );
    root.append(board);
  };

  const reset = () => {
    gameboard.fill(null);
    board.querySelectorAll('li').forEach((li) => {
      li.innerHTML = '';
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
