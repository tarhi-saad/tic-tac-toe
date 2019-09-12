import bsCustomFileInput from 'mdbootstrap/js/modules/bs-custom-file-input';
import 'mdbootstrap';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import homeView from './homeView';
import gameBoard from './gameboard';
import players from './players';

window.bsCustomFileInput = bsCustomFileInput;

const displayController = (function displayController() {
  const gameWrapper = document.createElement('div');
  const restart = document.createElement('button');
  const homeButton = document.createElement('button');

  const gameFlow = ({ target }, restartButton) => {
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

  const gameInit = (root) => {
    homeView.remove();
    gameWrapper.id = 'game-wrapper';
    root.append(gameWrapper);
    players.setNames(homeView.getNames().nameP1, homeView.getNames().nameP2);
    players.render(gameWrapper);
    gameBoard.render(gameWrapper);

    homeButton.id = 'home-button';
    homeButton.insertAdjacentHTML('beforeEnd', '<i class="fas fa-home"></i>');
    homeButton.classList.add('btn', 'btn-primary', 'waves-effect', 'waves-light');
    restart.id = 'restart';
    restart.innerHTML = 'Restart';
    restart.classList.add('btn', 'aqua-gradient', 'waves-effect', 'waves-light');
    gameWrapper.append(homeButton, restart);

    gameBoard.getHTMLBoard().addEventListener('click', (e) => {
      gameFlow(e, restart);
    });

    restart.addEventListener('click', () => {
      gameBoard.reset();
      players.reset();
    });

    homeButton.addEventListener('click', () => {
      gameWrapper.remove();
      homeView.attach(root);
    });
  };

  const attachGame = (root) => {
    homeView.remove();
    root.append(gameWrapper);
    gameBoard.reset();
    players.setNames(homeView.getNames().nameP1, homeView.getNames().nameP2);
    players.reset();
    restart.style.display = '';
  };

  const init = (root) => {
    homeView.render(root);

    homeView.playButton().addEventListener('click', (e) => {
      e.preventDefault();

      if (gameWrapper.innerHTML) {
        attachGame(root);
        return;
      }

      gameInit(root);
    });
  };

  return {
    init,
  };
}());

export default displayController;
