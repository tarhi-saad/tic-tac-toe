const player = (state) => ({
  play: () => state.mark,
  switchMark: () => {
    state.mark = state.mark === 'X' ? 'O' : 'X';
  },
  getTurn: () => state.turn,
  getName: () => state.name,
  getType: () => state.type,
});

const humanPlayer = () => {
  const state = {
    name: 'Anonymous',
    mark: 'X',
    type: 'Human',
  };

  const setName = (name) => {
    state.name = name || state.name;
  };

  return {
    ...player(state),
    setName,
  };
};

const aiPlayer = () => {
  const state = {
    name: 'AI',
    mark: 'O',
    type: 'AI',
  };

  return {
    ...player(state),
  };
};

export { humanPlayer, aiPlayer };
