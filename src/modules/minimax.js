const minimax = (() => {
  /**
   * Returns the player of this state
   * @param {string[] | null[]} state A state of the game
   * @returns The player's mark
   */
  const player = (state) => {
    let X = 0;
    let O = 0;
    state.forEach((square) => {
      if (square === 'X') X += 1;
      if (square === 'O') O += 1;
    });

    return X && X > O ? 'O' : 'X';
  };

  /**
   * Returns possible moves from this state
   * @param {string[] | null[]} state A state of the game
   * @returns {number[]} possible moves
   */
  const actions = (state) => (state.map((square, i) => (square === null ? i : null)))
    .filter((square) => square !== null);

  /**
   * Returns a new state after the given action on this given state
   * @param {string[] | null[]} state A state of the game
   * @param {number} action The action taken in a move
   * @returns {string[] | null[]} The new state after the given action
   */
  const result = (state, action) => {
    const newState = [...state];
    newState[action] = player(newState);
    return newState;
  };

  /**
   * Returns true if the given state is a terminal state. Win, lose or tie.
   * @param {string[] | null[]} state A state of the game
   */
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

  /**
   * Returns the objectif function in the given state for the given player
   * @param {string[] | null[]} state A state of the game
   * @param {string} playerMark A player of the game
   * @returns 0 if it's a tie, -1 if the player lost and 1 if the player won
   */
  const utility = (state, playerMark) => {
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

    if (win && playerMark === player(state)) return -1;

    if (win && playerMark !== player(state)) return 1;

    return 'Game is still going';
  };

  let best = null;

  /**
   * The minimax algorithm. Provides an optimal move for the player.
   * @param {string[] | null[]} state A state of the game
   * @returns {utility} Returns the highest utility at a given state
   */
  const minimaxAlgorithm = (
    state,
    depth = 0,
    alpha = -Infinity,
    beta = +Infinity,
    maximizingPlayer = 'X',
  ) => {
    depth += 1;

    if (terminal(state)) return utility(state, maximizingPlayer);

    if (player(state) === maximizingPlayer) {
      let evaMax = -Infinity;
      actions(state).some((a) => {
        const eva = minimaxAlgorithm(result(state, a), depth, alpha, beta);

        if (depth === 1 && evaMax < eva) best = a;

        evaMax = Math.max(evaMax, eva);
        alpha = Math.max(alpha, evaMax);

        if (beta <= alpha) return true;

        return false;
      });

      return evaMax;
    }

    let evaMin = +Infinity;
    actions(state).some((a) => {
      const eva = minimaxAlgorithm(result(state, a), depth, alpha, beta);

      if (depth === 1 && evaMin > eva) best = a;

      evaMin = Math.min(evaMin, eva);
      beta = Math.min(beta, evaMin);

      if (beta <= alpha) return true;

      return false;
    });

    return evaMin;
  };

  /**
   * Returns The first best with the highest utility for a given state
   * @param {string[] | null[]} state A state of the game
   * @returns {number} First best move
   */
  const bestMove = (state) => {
    minimaxAlgorithm(state);
    return best;
  };

  return {
    bestMove,
  };
})();

export default minimax;
