const players = (function players() {
  let nextIsX = true;
  const container = document.createElement('div');
  const first = {
    name: 'anonymous-1',
    turn: nextIsX,
  };
  const second = {
    name: 'anonymous-2',
    turn: !nextIsX,
  };

  const setNames = (name1, name2) => {
    first.name = name1;
    second.name = name2;
  };

  const next = () => (nextIsX ? first.name : second.name);

  const switchTurns = () => {
    nextIsX = !nextIsX;
    container.innerHTML = `Next player: ${next()}`;
  };

  const mark = () => (nextIsX ? 'X' : 'O');

  const displayState = (state) => {
    container.innerHTML = state;

    switch (state) {
      case 'first':
        container.innerHTML = `Next player: ${first.name}`;
        break;
      case 'win':
        container.innerHTML = `Congratulation to player: ${next()}`;
        break;
      case 'tie':
        container.innerHTML = 'It\' a tie!';
        break;
      default:
        container.innerHTML = `Next player: ${next()}`;
    }
  };

  const reset = () => {
    nextIsX = true;
    displayState('first');
  };

  const render = (root) => {
    container.id = 'game-status';
    displayState('first');
    root.append(container);
  };

  return {
    setNames,
    switchTurns,
    mark,
    render,
    reset,
    displayState,
  };
}());

export default players;
