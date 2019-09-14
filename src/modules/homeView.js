const homeView = (function homeView() {
  const homeWrapper = document.createElement('div');
  const form = document.createElement('form');
  const HTMLForm = `
    <div id="block-p1" class="md-form">
      <div class="input-name">
        <i class="fas fa-times prefix"></i>
        <input type="text" id="input-p1" name="nameP1" class="form-control">
        <label for="input-p1">Player1 name</label>
      </div>
    </div>
    <div id="block-p2" class="md-form">
      <div class="input-name">
        <i class="far fa-circle prefix"></i>
        <input type="text" id="input-p2" name="nameP2" class="form-control">
        <label for="input-p2">Player2 name</label>
      </div>
    </div>
    <button type="submit" id="play" name="play" class="btn peach-gradient text-center">PLAY<i class="far fa-play-circle" aria-hidden="true"></i></button>
  `;

  const render = (root) => {
    const gameTitle = document.createElement('h1');
    homeWrapper.id = 'home-wrapper';
    gameTitle.innerHTML = 'Tic Tac Toe';
    form.id = 'game-form';
    form.insertAdjacentHTML('beforeEnd', HTMLForm);
    homeWrapper.append(gameTitle, form);
    root.append(homeWrapper);
  };

  const playButton = () => form.elements.play;

  const remove = () => homeWrapper.remove();

  const getForm = () => homeWrapper;

  const attach = (root) => root.append(homeWrapper);

  const getNames = () => ({
    nameP1: form.elements.nameP1.value,
    nameP2: form.elements.nameP2.value,
  });

  return {
    render,
    playButton,
    remove,
    attach,
    getNames,
    getForm,
  };
}());

export default homeView;
