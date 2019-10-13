const homeView = (function homeView() {
  const homeWrapper = document.createElement('div');
  const form = document.createElement('form');
  const blockInput2 = document.createElement('div');
  blockInput2.id = 'block-p2';
  blockInput2.classList.add('md-form');
  blockInput2.insertAdjacentHTML('beforeend', `
    <div class="input-name">
      <i class="far fa-circle prefix"></i>
      <input type="text" id="input-p2" name="nameP2" class="form-control">
      <label for="input-p2">Player2 name</label>
    </div>
  `);
  const HTMLForm = `
    <div class="players-block">
      <span class="players-label">Players &#9658;</span>
      <div class="custom-control custom-switch" id="players-option">
        <input type="checkbox" name="players" class="custom-control-input" id="customSwitches" checked>
        <label class="" for="customSwitches">
          <i class="fas fa-user-friends"></i>
        </label>
        <div class="layer"></div>
      </div>
    </div>
    <div id="block-p1" class="md-form">
      <div class="input-name">
        <i class="fas fa-times prefix"></i>
        <input type="text" id="input-p1" name="nameP1" class="form-control">
        <label for="input-p1">Player1 name</label>
      </div>
    </div>
    <div id="difficulty">
      <div class="btn-group" data-toggle="buttons">
        <label class="btn btn-light-blue form-check-label">
          <input class="form-check-input" type="radio" name="options" id="Easy" autocomplete="off">
          Easy
        </label>
        <label class="btn btn-light-blue form-check-label">
          <input class="form-check-input" type="radio" name="options" id="Normal" autocomplete="off"> Normal
        </label>
        <label class="btn btn-light-blue form-check-label active">
          <input class="form-check-input" type="radio" name="options" id="Impossible" autocomplete="off" checked> Impossible
        </label>
      </div>
    </div>
    <button type="submit" id="play" name="play" class="btn peach-gradient text-center">
      PLAY<i class="far fa-play-circle" aria-hidden="true"></i>
    </button>
  `;

  const playButton = () => form.elements.play;

  const modeAi = () => form.elements.players.checked;

  const getDifficulty = () => {
    let diff = null;
    form.elements.options.forEach((radio) => {
      if (radio.checked) diff = radio.id;
    });

    return diff;
  };

  const render = (root) => {
    const gameTitle = document.createElement('h1');
    homeWrapper.id = 'home-wrapper';
    gameTitle.innerHTML = 'Tic Tac Toe';
    form.id = 'game-form';
    form.insertAdjacentHTML('beforeEnd', HTMLForm);
    homeWrapper.append(gameTitle, form);
    root.append(homeWrapper);

    const { players } = form.elements;
    const difficulty = document.querySelector('#difficulty');

    const handleChange = () => {
      players.disabled = true;
      if (modeAi()) {
        blockInput2.classList.remove('slide-in-left');
        blockInput2.classList.add('slide-out-left');
        difficulty.classList.remove('slide-out-right');
        difficulty.classList.add('slide-in-right');

        const animationHandlerInput = () => {
          blockInput2.remove();
          playButton().before(difficulty);
          blockInput2.removeEventListener('animationend', animationHandlerInput);
        };
        blockInput2.addEventListener('animationend', animationHandlerInput);

        const animationHandlerDifficulty = () => {
          difficulty.classList.remove('slide-in-right');
          players.disabled = false;
          difficulty.removeEventListener('animationend', animationHandlerDifficulty);
        };
        difficulty.addEventListener('animationend', animationHandlerDifficulty);
      } else {
        blockInput2.classList.add('slide-in-left');
        blockInput2.classList.remove('slide-out-left');
        difficulty.classList.add('slide-out-right');
        difficulty.classList.remove('slide-in-right');

        const animationHandlerDifficulty = () => {
          difficulty.remove();
          playButton().before(blockInput2);
          difficulty.removeEventListener('animationend', animationHandlerDifficulty);
        };
        difficulty.addEventListener('animationend', animationHandlerDifficulty);

        const animationHandlerInput = () => {
          blockInput2.classList.remove('slide-in-left');
          players.disabled = false;
          blockInput2.removeEventListener('animationend', animationHandlerInput);
        };
        blockInput2.addEventListener('animationend', animationHandlerInput);
      }
    };
    players.addEventListener('change', handleChange);

    const handleClick = (e) => {
      const labels = difficulty.querySelectorAll('label');
      Array.from(labels).forEach((label) => (
        e.target.closest('label') === label ? label.classList.add('active')
          : label.classList.remove('active')
      ));
    };
    difficulty.addEventListener('click', handleClick);
  };

  const remove = () => homeWrapper.remove();

  const getForm = () => homeWrapper;

  const attach = (root) => root.append(homeWrapper);

  const getNames = () => {
    if (modeAi()) {
      return {
        nameP1: form.elements.nameP1.value,
        nameP2: '',
      };
    }

    return {
      nameP1: form.elements.nameP1.value,
      nameP2: form.elements.nameP2.value,
    };
  };

  return {
    render,
    playButton,
    remove,
    attach,
    getNames,
    getForm,
    modeAi,
    getDifficulty,
  };
}());

export default homeView;
