const displayController = (function displayController() {
  const restart = document.createElement('button');

  const gameFlow = ({ target }, gameBoard, players, restartButton) => {
    const square = target.closest('.square');
    const squareIndex = square.dataset.index;
    const value = players.mark();

    if (!square
      || gameBoard.get()[squareIndex]
      || gameBoard.isWinner()) return;

    gameBoard.add(squareIndex, value);

    if (gameBoard.isWinner()) {
      players.displayState('win');
      return;
    }

    if (gameBoard.get().indexOf(null) === -1) {
      players.displayState('tie');
      return;
    }

    players.switchTurns();

    if (!restartButton.style.display) restartButton.style.display = 'block';
  };

  const init = (gameBoard, players, root) => {
    players.setNames('Saad', 'David');
    players.render(root);
    gameBoard.render(root);

    restart.id = 'restart';
    restart.innerHTML = 'Restart';
    root.append(restart);

    gameBoard.getHTMLBoard().addEventListener('click', (e) => {
      gameFlow(e, gameBoard, players, restart);
    });

    restart.addEventListener('click', () => {
      gameBoard.reset();
      players.reset();
    });
  };

  return {
    init,
  };
}());

export default displayController;
