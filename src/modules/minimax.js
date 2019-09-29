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
  const minimaxAlgorithm = (state, depth = 0) => {
    let alpha = -Infinity;
    let beta = +Infinity;
    depth += 1;

    if (terminal(state)) return utility(state, 'X');

    if (player(state) === 'X') {
      let evaMax = null;
      return Math.max(...actions(state).map((a) => {
        evaMax = minimaxAlgorithm(result(state, a), depth);

        if (depth === 1 && alpha < evaMax) {
          alpha = evaMax;
          best = a;
        }

        return evaMax;
      }));
    }

    let evaMin = null;
    return Math.min(...actions(state).map((a) => {
      evaMin = minimaxAlgorithm(result(state, a), depth);

      if (depth === 1 && beta > evaMin) {
        beta = evaMin;
        best = a;
      }

      return evaMin;
    }));
  };

  /**
   * Returns The best moves with the highest utility for a given state
   * @param {string[] | null[]} state A state of the game
   * @returns {number[]} list of Best moves
   */
  const bestMove = (state) => {
    // const minimaxCurrent = minimaxAlgorithm(state);
    // const moves = [];
    // actions(state).forEach((a) => {
    //   if (minimaxCurrent === minimaxAlgorithm(result(state, a))) moves.push(a);
    // });
    // return moves;

    minimaxAlgorithm(state);
    return best;
  };

  /**
   * Returns the best move in the second state for the second player
   * This function is used initialy instead of the minimax algorithm for performance reasons
   * @param {string[] | null[]} secondState The second state of the game
   * @returns {number} The best move
   */
  const firstMove = (secondState) => {
    let move = null;

    secondState.some((square, i) => {
      if (square === null) return false;

      let isBest = false;

      switch (i) {
        case 4: {
          const bestMoves = [0, 2, 6, 8];
          move = bestMoves[Math.floor(Math.random() * 4)];
          isBest = true;
          break;
        }

        case 0:
        case 2:
        case 6:
        case 8:
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

    return move;
  };

  return {
    bestMove,
    firstMove,
  };
})();

export default minimax;
