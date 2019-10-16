import homeView from './homeView';
import gameBoard from './gameboard';
import { humanPlayer, aiPlayer } from './players';
import minimax from './minimax';
import soundEffects from './soundEffects';

const displayController = (function displayController() {
  const gameWrapper = document.createElement('div');
  const restart = document.createElement('button');
  const homeButton = document.createElement('button');
  const resetScore = document.createElement('button');
  // const muteButton = document.createElement('button');
  const container = document.createElement('div');
  const score = {
    p1: [0, 0],
    p2: 0,
    ai: 0,
    tie: 0,
    tieAi: 0,
    p1VsP2: [0, 0, 0],
    p1VsAi: {
      Easy: [0, 0, 0],
      Normal: [0, 0, 0],
      Impossible: [0, 0, 0],
    },
  };
  let p1 = null;
  let p2 = null;
  let p1Turn = true;
  let nextIsX = p1Turn;

  /**
   * Testing for availability of "local storage"
   * @param {string} type Property on the window object named localStorage
   */
  const storageAvailable = (type) => {
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException
        // everything except Firefox
        && (e.code === 22
          // Firefox
          || e.code === 1014
          // test name field too, because code might not be present
          // everything except Firefox
          || e.name === 'QuotaExceededError'
          // Firefox
          || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        // acknowledge QuotaExceededError only if there's something already stored
        && (storage && storage.length !== 0)
      );
    }
  };

  const populateStorage = () => {
    const p1Lower = p1.getName().toLowerCase();
    const p2Lower = p2.getName().toLowerCase();
    const scoreAi = score.p1VsAi.Easy.concat(
      score.p1VsAi.Normal,
      score.p1VsAi.Impossible,
    );

    if (p1.getName() !== 'P1' && homeView.modeAi()) {
      localStorage.setItem(
        p1Lower,
        `${scoreAi[0]}%${scoreAi[1]}%${scoreAi[2]}%${scoreAi[3]}%${
          scoreAi[4]
        }%${scoreAi[5]}%${scoreAi[6]}%${scoreAi[7]}%${scoreAi[8]}`,
      );
    } else if (p1.getName() !== 'P1' && p2.getName() !== 'P2') {
      localStorage.setItem(
        `${p1Lower}%${p2Lower}`,
        `${score.p1VsP2[0]}%${score.p1VsP2[1]}%${score.p1VsP2[2]}`,
      );
    }
  };

  const next = () => (nextIsX ? p1.getName() : p2.getName());

  const displayState = (state) => {
    switch (state) {
      case 'first':
        container.className = '';
        container.innerHTML = '';
        container.insertAdjacentHTML(
          'beforeEnd',
          `
          <div id ="first-status" class="player-status alert alert-info" role="alert">
            ${p1.getName()}
            <span class="score scores">
              ${homeView.modeAi() ? score.p1VsAi[homeView.getDifficulty()][0] : score.p1VsP2[0]}
            </span>
          </div>
          <div class="tie">
            Ties<br>
            <span class="ties-count scores">
              ${homeView.modeAi() ? score.p1VsAi[homeView.getDifficulty()][1] : score.p1VsP2[1]}
            </span>
          </div>
          <div id="second-status" class="player-status alert alert-info" role="alert">
            ${p2.getName()}
            <span class="score scores">
              ${homeView.modeAi() ? score.p1VsAi[homeView.getDifficulty()][2] : score.p1VsP2[2]}
            </span>
          </div>
        `,
        );

        if (p1Turn) {
          container.querySelector('#first-status').classList.add('active');
        } else {
          container.querySelector('#second-status').classList.add('active');
        }
        break;
      case 'continue':
        if (nextIsX) {
          container.querySelector('#first-status').classList.add('active');
          container.querySelector('#second-status').classList.remove('active');
        } else {
          container.querySelector('#first-status').classList.remove('active');
          container.querySelector('#second-status').classList.add('active');
        }
        break;
      case 'win':
        soundEffects.playWin();
        container.innerHTML = `Congratulation to player: ${next()}`;
        container.classList.add(
          'alert-primary',
          'animated',
          'tada',
          'status-result',
        );
        p1Turn = !p1Turn;
        nextIsX = p1Turn;

        if (storageAvailable('localStorage')) {
          populateStorage();
        }

        break;
      case 'tie':
        soundEffects.playTie();
        container.innerHTML = "It's a tie!";
        container.classList.add(
          'alert-warning',
          'animated',
          'shake',
          'status-result',
        );
        p1Turn = !p1Turn;
        nextIsX = p1Turn;

        if (storageAvailable('localStorage')) {
          populateStorage();
        }

        break;
      case 'lose':
        soundEffects.playLose();
        container.innerHTML = 'You lose!';
        container.classList.add(
          'alert-danger',
          'animated',
          'wobble',
          'status-result',
        );
        p1Turn = !p1Turn;
        nextIsX = p1Turn;

        if (storageAvailable('localStorage')) {
          populateStorage();
        }

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

      if (
        lastState[zero]
        && lastState[one]
        && lastState[zero] === lastState[one]
        && lastState[two] === null
      ) {
        move = two;

        if (lastState[zero] === 'O') return true;
      }

      if (
        lastState[one]
        && lastState[two]
        && lastState[one] === lastState[two]
        && lastState[zero] === null
      ) {
        move = zero;

        if (lastState[one] === 'O') return true;
      }

      if (
        lastState[zero]
        && lastState[two]
        && lastState[zero] === lastState[two]
        && lastState[one] === null
      ) {
        move = one;

        if (lastState[zero] === 'O') return true;
      }

      return false;
    });

    if (move !== null) return true;

    return false;
  };

  /**
   * Returns the best move in the second state for the second player
   * This function is used initialy instead of the minimax algorithm for performance reasons
   * @param {string[] | null[]} secondState The second state of the game
   * @returns {number} The best move
   */
  const firstMove = () => {
    let bestFirstMove = null;
    const lastState = gameBoard.get();

    lastState.some((square, i) => {
      if (square === null) return false;

      let isBest = false;

      switch (i) {
        case 4: {
          const bestMoves = [0, 2, 6, 8];
          bestFirstMove = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }

        case 0:
        case 2:
        case 6:
        case 8:
          bestFirstMove = 4;
          isBest = true;
          break;

        case 1: {
          const bestMoves = [0, 2, 4, 7];
          bestFirstMove = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }
        case 3: {
          const bestMoves = [0, 4, 5, 6];
          bestFirstMove = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }
        case 5: {
          const bestMoves = [2, 3, 4, 8];
          bestFirstMove = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }
        case 7: {
          const bestMoves = [1, 4, 6, 8];
          bestFirstMove = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }

        default:
          break;
      }

      return isBest;
    });

    return bestFirstMove;
  };

  const SetAIDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'Easy': {
        const emptySquares = [];
        gameBoard.get().forEach((mark, i) => {
          if (mark) return;

          emptySquares.push(i);
        });
        const AiMove = Math.floor(Math.random() * emptySquares.length);
        gameBoard.add(emptySquares[AiMove], 'O');
        break;
      }
      case 'Normal':
        if (willWin()) {
          gameBoard.add(move, 'O');
        } else if (history.length === 1 && firstMove()) {
          gameBoard.add(firstMove(), 'O');
        } else {
          const emptySquares = [];
          gameBoard.get().forEach((mark, i) => {
            if (mark) return;

            emptySquares.push(i);
          });
          const AiMove = Math.floor(Math.random() * emptySquares.length);
          gameBoard.add(emptySquares[AiMove], 'O');
        }
        break;
      case 'Impossible':
        if (willWin()) {
          gameBoard.add(move, 'O');
        } else {
          const bestMove = minimax.bestMove(gameBoard.get());
          gameBoard.add(bestMove, 'O');
        }
        break;
      default:
    }
  };

  const aiFlow = () => {
    document.body.style.pointerEvents = 'none';
    const transitionHandler = () => {
      soundEffects.playOMark();
      SetAIDifficulty(homeView.getDifficulty());

      if (gameBoard.isWinner()) {
        container
          .querySelector('.player-status')
          .removeEventListener('transitionend', transitionHandler);
        score.p1VsAi[homeView.getDifficulty()][2] += 1;
        displayState('lose');
        document.body.style.pointerEvents = '';
        return;
      }

      if (gameBoard.get().indexOf(null) === -1) {
        container
          .querySelector('.player-status')
          .removeEventListener('transitionend', transitionHandler);
        score.p1VsAi[homeView.getDifficulty()][1] += 1;
        displayState('tie');
        document.body.style.pointerEvents = '';
        return;
      }

      nextIsX = !nextIsX;
      displayState('continue');

      container
        .querySelector('.player-status')
        .removeEventListener('transitionend', transitionHandler);
      document.body.style.pointerEvents = '';
    };

    container
      .querySelector('.player-status')
      .addEventListener('transitionend', transitionHandler);
  };

  const AIFirstMove = () => {
    gameBoard.getHTMLBoard().style.pointerEvents = 'none';

    const transitionLineHandler = () => {
      soundEffects.playOMark();
      const AiMove = Math.floor(Math.random() * 9);
      gameBoard.add(AiMove, 'O');
      history.push([].concat(gameBoard.get()));
      nextIsX = !nextIsX;
      displayState('continue');

      document
        .getElementById('svg-board-line1')
        .removeEventListener('transitionend', transitionLineHandler);
    };

    document
      .getElementById('svg-board-line1')
      .addEventListener('transitionend', transitionLineHandler);

    const transitionHandler = () => {
      container
        .querySelector('.player-status')
        .removeEventListener('transitionend', transitionHandler);
      gameBoard.getHTMLBoard().style.pointerEvents = '';
    };

    container
      .querySelector('.player-status')
      .addEventListener('transitionend', transitionHandler);
  };

  const gameFlow = ({ target }, restartButton, player) => {
    const square = target.closest('.square');

    if (!square) return;

    const squareIndex = square.dataset.index;

    if (gameBoard.get()[squareIndex] || gameBoard.isWinner()) return;

    gameBoard.add(squareIndex, player.play());

    if (gameBoard.isWinner()) {
      if (player === p1) {
        homeView.modeAi()
          ? (score.p1VsAi[homeView.getDifficulty()][0] += 1)
          : (score.p1VsP2[0] += 1);
      } else {
        score.p1VsP2[2] += 1;
      }

      displayState('win');
      return;
    }

    if (gameBoard.get().indexOf(null) === -1) {
      homeView.modeAi()
        ? (score.p1VsAi[homeView.getDifficulty()][1] += 1)
        : (score.p1VsP2[1] += 1);
      displayState('tie');
      return;
    }

    nextIsX = !nextIsX;
    displayState('continue');

    if (homeView.modeAi()) {
      history.push([].concat(gameBoard.get()));
      aiFlow();
    }

    if (!restartButton.style.display) restartButton.style.display = 'block';
  };

  const render = (root) => {
    container.id = 'game-status';
    container.insertAdjacentHTML(
      'beforeEnd',
      `
      <div id ="first-status" class="player-status alert alert-info active" role="alert">
        ${p1.getName()}
        <span class="score scores">
          ${homeView.modeAi() ? score.p1VsAi[homeView.getDifficulty()][0] : score.p1VsP2[0]}
        </span>
      </div>
      <div class="tie">
        Ties<br>
        <span class="ties-count scores">
          ${homeView.modeAi() ? score.p1VsAi[homeView.getDifficulty()][1] : score.p1VsP2[1]}
        </span>
      </div>
      <div id="second-status" class="player-status alert alert-info" role="alert">
        ${p2.getName()}
        <span class="score scores">
          ${homeView.modeAi() ? score.p1VsAi[homeView.getDifficulty()][2] : score.p1VsP2[2]}
        </span>
      </div>
      `,
    );
    root.append(container);
  };

  const reset = () => {
    soundEffects.playBoard();
    gameBoard.reset();
    displayState('first');
    nextIsX = p1Turn;
    history.splice(0, history.length);

    if (!p1Turn && homeView.modeAi()) AIFirstMove();
  };

  const gameInit = (root) => {
    homeView.remove();
    gameWrapper.id = 'game-wrapper';
    root.append(gameWrapper);
    render(gameWrapper);
    soundEffects.playBoard();
    gameBoard.render(gameWrapper);

    homeButton.id = 'home-button';
    homeButton.insertAdjacentHTML('beforeEnd', '<i class="fas fa-home"></i>');
    homeButton.classList.add(
      'btn',
      'btn-primary',
      'waves-effect',
      'waves-light',
    );
    // muteButton.insertAdjacentHTML('beforeend', '<i class="fas fa-volume-up"></i>');
    // muteButton.id = 'mute-button-game';
    // muteButton.classList.add('btn', 'btn-primary', 'waves-effect', 'waves-light', 'mute-button');
    restart.id = 'restart';
    restart.innerHTML = 'Restart';
    restart.classList.add(
      'btn',
      'aqua-gradient',
      'waves-effect',
      'waves-light',
    );
    resetScore.id = 'reset-score';
    resetScore.insertAdjacentHTML(
      'beforeEnd',
      '<i class="fas fa-trash-alt"></i>',
    );
    resetScore.classList.add(
      'btn',
      'btn-primary',
      'waves-effect',
      'waves-light',
    );
    resetScore.dataset.toggle = 'modal';
    resetScore.dataset.target = '#modalConfirmResetScore';
    gameWrapper.append(homeButton, restart, resetScore, homeView.getMuteButton());
    root.insertAdjacentHTML(
      'beforeend',
      `
    <!--Modal: modalConfirmResetScore-->
      <div class="modal fade" id="modalConfirmResetScore" tabindex="-1" role="dialog" aria-labelledby="modalConfirmResetScore"
        aria-hidden="true">
        <div class="modal-dialog modal-sm modal-notify modal-danger" role="document">
          <!--Content-->
          <div class="modal-content text-center">
            <!--Header-->
            <div class="modal-header d-flex justify-content-center">
              <p class="heading">All scores will be reset!</p>
            </div>
      
            <!--Body-->
            <div class="modal-body">
      
              <i class="fas fa-times fa-4x animated rotateIn"></i>
      
            </div>
      
            <!--Footer-->
            <div class="modal-footer flex-center">
              <a href="#" id="confirmResetScoresBtn" class="btn  btn-outline-danger" data-dismiss="modal">Ok</a>
              <a type="button" id="cancelResetScoreBtn" class="btn  btn-danger waves-effect" data-dismiss="modal">Cancel</a>
            </div>
          </div>
          <!--/.Content-->
        </div>
      </div>
      <!--Modal: modalConfirmResetScore-->
      `,
    );

    // const handleClick = (e) => (nextIsX ? gameFlow(e, restart, p1) : gameFlow(e, restart, p2));
    const handleClick = (e) => {
      const square = e.target.closest('.square');

      if (nextIsX) {
        if (
          square
          && !gameBoard.get()[square.dataset.index]
          && !gameBoard.isWinner()
        ) soundEffects.playXMark();

        gameFlow(e, restart, p1);
      } else {
        if (
          square
          && !gameBoard.get()[square.dataset.index]
          && !gameBoard.isWinner()
        ) soundEffects.playOMark();

        gameFlow(e, restart, p2);
      }
    };

    gameBoard.getHTMLBoard().addEventListener('click', handleClick);

    restart.addEventListener('click', () => {
      reset();
    });

    homeButton.addEventListener('click', () => {
      soundEffects.playSwipe();
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

    const handleResetScoreClick = () => {
      const gameStatus = document.getElementById('game-status');
      gameStatus.classList.remove('jello-horizontal');
      void gameStatus.offsetWidth;
      gameStatus.classList.add('jello-horizontal');
      soundEffects.playBubble();
      const AIStorage = localStorage.getItem(p1.getName().toLowerCase());

      if (homeView.modeAi() && AIStorage) {
        const scoreAi = score.p1VsAi[homeView.getDifficulty()];
        [scoreAi[0], scoreAi[1], scoreAi[2]] = [0, 0, 0];
        localStorage.setItem(
          p1.getName().toLowerCase(),
          `${score.p1VsAi.Easy[0]}%${score.p1VsAi.Easy[1]}%${score.p1VsAi.Easy[2]}%${
            score.p1VsAi.Normal[0]
          }%${score.p1VsAi.Normal[1]}%${score.p1VsAi.Normal[2]}%${score.p1VsAi.Impossible[0]}%${
            score.p1VsAi.Impossible[1]
          }%${score.p1VsAi.Impossible[2]}`,
        );
      } else {
        localStorage.removeItem(`${p1.getName()}%${p2.getName()}`);
        [score.p1VsP2[0], score.p1VsP2[1], score.p1VsP2[2]] = [0, 0, 0];
      }

      gameStatus.querySelectorAll('.scores').forEach((span) => {
        span.innerHTML = '0';
      });
    };

    root
      .querySelector('#confirmResetScoresBtn')
      .addEventListener('click', handleResetScoreClick);

    const handleCancelResetScoreClick = () => soundEffects.playMenu();
    root
      .querySelector('#cancelResetScoreBtn')
      .addEventListener('click', handleCancelResetScoreClick);

    const handleStatusClick = (e) => {
      const player = e.target.closest('.player-status');
      gameBoard.getHTMLBoard().style.pointerEvents = '';

      if (player) {
        soundEffects.playBoard();
        gameBoard.reset();

        if (player.id === 'first-status') {
          p1Turn = true;
        } else p1Turn = false;

        displayState('first');
        nextIsX = p1Turn;
        history.splice(0, history.length);

        if (!p1Turn && homeView.modeAi()) AIFirstMove();
      }
    };

    document
      .getElementById('game-status')
      .addEventListener('click', handleStatusClick);

    const handleScoreButtonClick = () => soundEffects.playMenu();
    resetScore.addEventListener('click', handleScoreButtonClick);
  };

  const attachGame = (root) => {
    homeView.remove();
    p1Turn = true;
    root.append(gameWrapper);
    gameWrapper.append(homeView.getMuteButton());
    reset();
    restart.style.display = '';
  };

  const setScore = (name1, name2) => {
    const name1Lower = name1.toLowerCase();
    const name2Lower = name2.toLowerCase();

    if (name1 && localStorage.getItem(name1Lower)) {
      const scores = localStorage.getItem(name1Lower).split('%');
      [
        score.p1VsAi.Easy[0],
        score.p1VsAi.Easy[1],
        score.p1VsAi.Easy[2],
        score.p1VsAi.Normal[0],
        score.p1VsAi.Normal[1],
        score.p1VsAi.Normal[2],
        score.p1VsAi.Impossible[0],
        score.p1VsAi.Impossible[1],
        score.p1VsAi.Impossible[2],
      ] = scores.map((x) => {
        if (Number.isNaN(Number(x))) return 0;

        return Number(x);
      });
    } else {
      [
        score.p1VsAi.Easy[0],
        score.p1VsAi.Easy[1],
        score.p1VsAi.Easy[2],
        score.p1VsAi.Normal[0],
        score.p1VsAi.Normal[1],
        score.p1VsAi.Normal[2],
        score.p1VsAi.Impossible[0],
        score.p1VsAi.Impossible[1],
        score.p1VsAi.Impossible[2],
      ] = Array(9).fill(0);
    }

    if (name2 && localStorage.getItem(`${name1Lower}%${name2Lower}`)) {
      const scoresHuman = localStorage
        .getItem(`${name1Lower}%${name2Lower}`)
        .split('%');
      [score.p1VsP2[0], score.p1VsP2[1], score.p1VsP2[2]] = scoresHuman.map((x) => Number(x));
    } else {
      [score.p1VsP2[0], score.p1VsP2[1], score.p1VsP2[2]] = [0, 0, 0];
    }
  };

  const playersInit = () => {
    const { nameP1, nameP2 } = homeView.getNames();
    setScore(nameP1, nameP2);

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
    soundEffects.init();

    homeView.playButton().addEventListener('click', (e) => {
      soundEffects.playSwipe();
      e.preventDefault();
      homeView.getForm().classList.remove('slide-in-left');
      homeView.getForm().classList.add('slide-out-left');
      gameWrapper.classList.remove('slide-out-right');
      gameWrapper.classList.add('slide-in-right');

      playersInit();

      const animationHandler = () => {
        homeView.getForm().classList.remove('slide-out-left');
        homeView
          .getForm()
          .removeEventListener('animationend', animationHandler);

        if (gameWrapper.innerHTML) {
          attachGame(root);
          return;
        }

        gameInit(root);
      };

      homeView.getForm().addEventListener('animationend', animationHandler);
    });

    const handleMuteClick = (e) => {
      const muteBtn = e.target.closest('.mute-button');
      const muteIcon = muteBtn.querySelector('i');
      muteIcon.classList.toggle('fa-volume-mute');
      muteIcon.classList.toggle('fa-volume-up');
      if (muteIcon.classList.contains('fa-volume-up')) {
        document.querySelectorAll('audio').forEach((audio) => {
          audio.muted = false;
        });
        soundEffects.playMenu();
      } else {
        document.querySelectorAll('audio').forEach((audio) => {
          audio.muted = true;
        });
      }
    };
    document.querySelector('.mute-button').addEventListener('click', handleMuteClick);
  };

  return {
    init,
  };
}());

export default displayController;
