import homeView from './homeView';
import gameBoard from './gameboard';
import { humanPlayer, aiPlayer } from './players';

const displayController = (function displayController() {
  const gameWrapper = document.createElement('div');
  const restart = document.createElement('button');
  const homeButton = document.createElement('button');
  const container = document.createElement('div');
  let p1 = null;
  let p2 = null;
  let nextIsX = true;

  const next = () => (nextIsX ? p1.getName() : p2.getName());

  const displayState = (state) => {
    switch (state) {
      case 'first':
        container.innerHTML = `Next player: ${p1.getName()}`;
        container.className = '';
        container.classList.add('alert', 'alert-info');
        break;
      case 'continue':
        container.innerHTML = `Next player: ${next()}`;
        break;
      case 'win':
        container.innerHTML = `Congratulation to player: ${next()}`;
        container.classList.add('alert-primary', 'animated', 'tada');
        container.classList.remove('alert-info');
        break;
      case 'tie':
        container.innerHTML = 'It\' a tie!';
        container.classList.add('alert-warning', 'animated', 'shake');
        container.classList.remove('alert-info');
        break;
      default:
        container.innerHTML = `Next player: ${next()}`;
    }
  };

  const aiFlow = (squareIndex) => {
    document.body.style.pointerEvents = 'none';

    const transitionHandler = () => {
      const emptySquares = [];
      gameBoard.get().forEach((mark, i) => {
        if (mark) return;

        emptySquares.push(i);
      });
      const AiMove = Math.floor(Math.random() * emptySquares.length);
      gameBoard.add(emptySquares[AiMove], 'O');

      if (gameBoard.isWinner()) {
        displayState('win');
        document.body.style.pointerEvents = '';
        gameBoard.getHTMLBoard().querySelectorAll('li')[squareIndex]
          .querySelector('.svg-x-mark .path-x-2')
          .removeEventListener('transitionend', transitionHandler);
        return;
      }

      nextIsX = !nextIsX;
      displayState('continue');

      gameBoard.getHTMLBoard().querySelectorAll('li')[squareIndex]
        .querySelector('.svg-x-mark .path-x-2')
        .removeEventListener('transitionend', transitionHandler);
      document.body.style.pointerEvents = '';
    };

    gameBoard.getHTMLBoard().querySelectorAll('li')[squareIndex]
      .querySelector('.svg-x-mark .path-x-2')
      .addEventListener('transitionend', transitionHandler);
  };

  const gameFlow = ({ target }, restartButton, player) => {
    const square = target.closest('.square');

    if (!square) return;

    const squareIndex = square.dataset.index;

    if (gameBoard.get()[squareIndex] || gameBoard.isWinner()) return;

    gameBoard.add(squareIndex, player.play());

    if (gameBoard.isWinner()) {
      displayState('win');
      return;
    }

    if (gameBoard.get().indexOf(null) === -1) {
      displayState('tie');
      return;
    }

    nextIsX = !nextIsX;
    displayState('continue');

    if (homeView.modeAi()) aiFlow(squareIndex);

    if (!restartButton.style.display) restartButton.style.display = 'block';
  };

  const render = (root) => {
    container.id = 'game-status';
    container.classList.add('alert', 'alert-info');
    container.role = 'alert';
    displayState('first');
    root.append(container);
  };

  const reset = () => {
    gameBoard.reset();
    displayState('first');
    nextIsX = true;
  };

  const gameInit = (root) => {
    homeView.remove();
    gameWrapper.id = 'game-wrapper';
    root.append(gameWrapper);
    render(gameWrapper);
    gameBoard.render(gameWrapper);

    homeButton.id = 'home-button';
    homeButton.insertAdjacentHTML('beforeEnd', '<i class="fas fa-home"></i>');
    homeButton.classList.add('btn', 'btn-primary', 'waves-effect', 'waves-light');
    restart.id = 'restart';
    restart.innerHTML = 'Restart';
    restart.classList.add('btn', 'aqua-gradient', 'waves-effect', 'waves-light');
    gameWrapper.append(homeButton, restart);

    const handleClick = (e) => (nextIsX ? gameFlow(e, restart, p1) : gameFlow(e, restart, p2));

    gameBoard.getHTMLBoard().addEventListener('click', handleClick);

    restart.addEventListener('click', () => {
      reset();
    });

    homeButton.addEventListener('click', () => {
      gameWrapper.classList.remove('slide-in-right');
      gameWrapper.classList.add('slide-out-right');

      const animationHandler = () => {
        gameWrapper.remove();
        homeView.attach(root);
        homeView.getForm().classList.add('slide-in-left');
        gameWrapper.removeEventListener('animationend', animationHandler);
      };
      gameWrapper.addEventListener('animationend', animationHandler);
    });
  };

  const attachGame = (root) => {
    homeView.remove();
    root.append(gameWrapper);
    reset();
    restart.style.display = '';
  };

  const playersInit = () => {
    const { nameP1, nameP2 } = homeView.getNames();
    if (!p1 || p1.getName() !== nameP1) {
      p1 = humanPlayer();
      p1.setName('P1');
      p1.setName(nameP1);
    }

    if (homeView.modeAi()) {
      if (!p2 || p2.getType() !== 'AI') p2 = aiPlayer();
    } else if (!p2 || p2.getName() !== nameP2 || p2.getType() === 'AI') {
      p2 = humanPlayer();
      p2.switchMark();
      p2.setName('P2');
      p2.setName(nameP2);
    }
  };

  const init = (root) => {
    homeView.render(root);

    homeView.playButton().addEventListener('click', (e) => {
      e.preventDefault();
      homeView.getForm().classList.remove('slide-in-left');
      homeView.getForm().classList.add('slide-out-left');
      gameWrapper.classList.remove('slide-out-right');
      gameWrapper.classList.add('slide-in-right');

      playersInit();

      const animationHandler = () => {
        homeView.getForm().classList.remove('slide-out-left');
        homeView.getForm().removeEventListener('animationend', animationHandler);

        if (gameWrapper.innerHTML) {
          attachGame(root);
          return;
        }

        gameInit(root);
      };

      homeView.getForm().addEventListener('animationend', animationHandler);
    });
  };

  return {
    init,
  };
}());

export default displayController;
