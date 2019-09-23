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

  const history = [];
  let move = null;

  const willWin = () => {
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

    const lastState = history[history.length - 1];
    move = null;

    possibilities.some((arr) => {
      const [zero, one, two] = arr;

      if (lastState[zero] && lastState[one]
        && lastState[zero] === lastState[one] && lastState[two] === null
      ) {
        move = two;

        if (lastState[zero] === 'O') return true;
      }

      if (lastState[one] && lastState[two]
        && lastState[one] === lastState[two] && lastState[zero] === null
      ) {
        move = zero;

        if (lastState[one] === 'O') return true;
      }

      if (lastState[zero] && lastState[two]
        && lastState[zero] === lastState[two] && lastState[one] === null
      ) {
        move = one;

        if (lastState[zero] === 'O') return true;
      }

      return false;
    });

    if (move !== null) return true;

    return false;
  };

  const nextPlayer = (state) => {
    let X = 0;
    let O = 0;
    state.forEach((square) => {
      if (square === 'X') X += 1;
      if (square === 'O') O += 1;
    });

    return X && X > O ? 'O' : 'X';
  };

  const actions = (state) => (state.map((square, i) => (square === null ? i : null)))
    .filter((square) => square !== null);

  const result = (state, action) => {
    const newState = [...state];
    newState[action] = nextPlayer(newState);
    return newState;
  };

  const terminal = (state) => {
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

    return possibilities.some((arr) => state[arr[0]] && state[arr[0]] === state[arr[1]]
    && state[arr[0]] === state[arr[2]]) || state.indexOf(null) === -1;
  };

  const utility = (state, player) => {
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

    const win = possibilities.some((arr) => state[arr[0]] && state[arr[0]] === state[arr[1]]
    && state[arr[0]] === state[arr[2]]);

    if (state.indexOf(null) === -1 && !win) return 0;

    if (win && player === nextPlayer(state)) return -1;

    if (win && player !== nextPlayer(state)) return 1;

    return 'Game still going';
  };

  const minimax = (state) => {
    if (terminal(state)) return utility(state, 'X');

    if (nextPlayer(state) === 'X') {
      return Math.max(...actions(state).map((a) => minimax(result(state, a))));
    }

    return Math.min(...actions(state).map((a) => minimax(result(state, a))));
  };

  const bestMove = (state) => {
    const minimaxCurrent = minimax(state);
    const moves = [];
    actions(state).forEach((a) => {
      if (minimaxCurrent === minimax(result(state, a))) moves.push(a);
    });

    return moves;
  };

  const firstMove = () => {
    const lastState = gameBoard.get();

    return lastState.some((square, i) => {
      if (square === null) return false;

      // if (i === 4) {
      //   const bestMoves = [0, 2, 6, 8];
      //   move = bestMoves[Math.floor(Math.random() * 4)];
      //   return true;
      // }

      let isBest = false;

      switch (i) {
        case 4: {
          const bestMoves = [0, 2, 6, 8];
          move = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }

        case 0 || 2 || 6 || 8:
          move = 4;
          isBest = true;
          break;

        case 1: {
          const bestMoves = [0, 2, 4, 7];
          move = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }
        case 3: {
          const bestMoves = [0, 4, 5, 6];
          move = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }
        case 5: {
          const bestMoves = [2, 3, 4, 8];
          move = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }
        case 7: {
          const bestMoves = [1, 4, 6, 8];
          move = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }

        default:
          break;
      }

      return isBest;
    });
  };

  const aiFlow = (squareIndex) => {
    document.body.style.pointerEvents = 'none';

    const transitionHandler = () => {
      // const availableActions = actions(gameBoard.get());
      // const t0 = Date.now();
      // console.log(Date.now() - t0, 's || Actions: ', availableActions);

      if (willWin()) {
        gameBoard.add(move, 'O');
      } else if (history.length === 1 && firstMove()) {
        gameBoard.add(move, 'O');
      } else {
        const availableActions = bestMove(gameBoard.get());
        const AiMove = Math.floor(Math.random() * availableActions.length);
        gameBoard.add(availableActions[AiMove], 'O');
      }

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

    if (homeView.modeAi()) {
      history.push([].concat(gameBoard.get()));
      aiFlow(squareIndex);
    }

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
    history.splice(0, history.length);
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
