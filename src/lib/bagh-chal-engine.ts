// Bagh Chal (बाघचाल) Rules & AI Engine for Shakya Bajracharya Samaj Yala

export type Piece = "T" | "G" | null; // T = Tiger (बाघ), G = Goat (बाख्रा)
export type Board = Piece[][];
export type Turn = "G" | "T";
export type Phase = "PLACEMENT" | "MOVEMENT";

export interface Point {
  r: number;
  c: number;
}

export interface Move {
  from: Point | null; // null if placing goat in PLACEMENT phase
  to: Point;
  capture?: Point; // coordinate of captured goat if tiger jumped
}

export interface GameState {
  board: Board;
  turn: Turn;
  phase: Phase;
  goatsPlaced: number;
  goatsCaptured: number;
  winner: Turn | null;
  winReason?: string;
  history: Array<{
    board: Board;
    turn: Turn;
    phase: Phase;
    goatsPlaced: number;
    goatsCaptured: number;
    lastMove?: Move;
  }>;
}

// 5x5 board initial setup
// 4 Tigers placed at 4 corners
export function createInitialState(): GameState {
  const board: Board = [
    ["T", null, null, null, "T"],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    ["T", null, null, null, "T"],
  ];

  return {
    board,
    turn: "G", // Goats move/place first
    phase: "PLACEMENT",
    goatsPlaced: 0,
    goatsCaptured: 0,
    winner: null,
    history: [],
  };
}

// Check if point is inside 5x5 grid
export function isValidPoint(r: number, c: number): boolean {
  return r >= 0 && r < 5 && c >= 0 && c < 5;
}

// Check if a point has diagonal connections in Bagh Chal
// Only points where (r + c) % 2 === 0 have diagonal lines
export function hasDiagonal(r: number, c: number): boolean {
  return (r + c) % 2 === 0;
}

// Get all adjacent connected points from (r, c)
export function getAdjacentPoints(r: number, c: number): Point[] {
  const neighbors: Point[] = [];

  // 4 Orthogonal directions
  const orthogonalDirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (const [dr, dc] of orthogonalDirs) {
    const nr = r + dr;
    const nc = c + dc;
    if (isValidPoint(nr, nc)) {
      neighbors.push({ r: nr, c: nc });
    }
  }

  // 4 Diagonal directions (only for nodes where hasDiagonal is true)
  if (hasDiagonal(r, c)) {
    const diagonalDirs = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (const [dr, dc] of diagonalDirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (isValidPoint(nr, nc)) {
        neighbors.push({ r: nr, c: nc });
      }
    }
  }

  return neighbors;
}

// Check if two points are directly connected by a valid board line
export function arePointsConnected(p1: Point, p2: Point): boolean {
  const dr = Math.abs(p1.r - p2.r);
  const dc = Math.abs(p1.c - p2.c);

  // Orthogonal step of 1
  if ((dr === 1 && dc === 0) || (dr === 0 && dc === 1)) {
    return true;
  }

  // Diagonal step of 1: only valid if p1 has diagonal capability
  if (dr === 1 && dc === 1 && hasDiagonal(p1.r, p1.c)) {
    return true;
  }

  return false;
}

// Get all valid moves for a Goat
export function getGoatMoves(state: GameState, from?: Point): Move[] {
  const moves: Move[] = [];

  if (state.phase === "PLACEMENT") {
    // Placement: any empty cell
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (state.board[r][c] === null) {
          moves.push({ from: null, to: { r, c } });
        }
      }
    }
    return moves;
  }

  // Movement phase: move 1 step along connected line
  const startPoints: Point[] = from
    ? [from]
    : getAllPiecePoints(state.board, "G");

  for (const p of startPoints) {
    const adj = getAdjacentPoints(p.r, p.c);
    for (const neighbor of adj) {
      if (state.board[neighbor.r][neighbor.c] === null) {
        moves.push({ from: p, to: neighbor });
      }
    }
  }

  return moves;
}

// Get all valid moves for a Tiger (including jumps/captures)
export function getTigerMoves(state: GameState, from?: Point): Move[] {
  const moves: Move[] = [];
  const startPoints: Point[] = from
    ? [from]
    : getAllPiecePoints(state.board, "T");

  for (const p of startPoints) {
    const adj = getAdjacentPoints(p.r, p.c);

    for (const neighbor of adj) {
      // 1. Simple 1-step move to empty adjacent point
      if (state.board[neighbor.r][neighbor.c] === null) {
        moves.push({ from: p, to: neighbor });
      }

      // 2. Jump over adjacent Goat
      if (state.board[neighbor.r][neighbor.c] === "G") {
        const dr = neighbor.r - p.r;
        const dc = neighbor.c - p.c;
        const jumpR = neighbor.r + dr;
        const jumpC = neighbor.c + dc;

        // Check if jump landing spot is valid and empty
        if (isValidPoint(jumpR, jumpC) && state.board[jumpR][jumpC] === null) {
          moves.push({
            from: p,
            to: { r: jumpR, c: jumpC },
            capture: { r: neighbor.r, c: neighbor.c },
          });
        }
      }
    }
  }

  return moves;
}

// Find coordinates of all pieces of a given type
export function getAllPiecePoints(board: Board, type: "T" | "G"): Point[] {
  const points: Point[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (board[r][c] === type) {
        points.push({ r, c });
      }
    }
  }
  return points;
}

// Count how many tigers are currently trapped (have 0 legal moves)
export function countTrappedTigers(state: GameState): number {
  const tigers = getAllPiecePoints(state.board, "T");
  let trapped = 0;

  for (const t of tigers) {
    const moves = getTigerMoves(state, t);
    if (moves.length === 0) {
      trapped++;
    }
  }

  return trapped;
}

// Clone board helper
export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

// Execute a move and return the new GameState
export function applyMove(state: GameState, move: Move): GameState {
  if (state.winner) return state;

  const newBoard = cloneBoard(state.board);
  let newGoatsPlaced = state.goatsPlaced;
  let newGoatsCaptured = state.goatsCaptured;
  let newPhase = state.phase;

  if (state.turn === "G") {
    if (state.phase === "PLACEMENT") {
      newBoard[move.to.r][move.to.c] = "G";
      newGoatsPlaced++;
      if (newGoatsPlaced >= 20) {
        newPhase = "MOVEMENT";
      }
    } else {
      if (move.from) {
        newBoard[move.from.r][move.from.c] = null;
      }
      newBoard[move.to.r][move.to.c] = "G";
    }
  } else {
    // Tiger move
    if (move.from) {
      newBoard[move.from.r][move.from.c] = null;
    }
    newBoard[move.to.r][move.to.c] = "T";

    if (move.capture) {
      newBoard[move.capture.r][move.capture.c] = null;
      newGoatsCaptured++;
    }
  }

  const nextTurn: Turn = state.turn === "G" ? "T" : "G";

  const nextState: GameState = {
    board: newBoard,
    turn: nextTurn,
    phase: newPhase,
    goatsPlaced: newGoatsPlaced,
    goatsCaptured: newGoatsCaptured,
    winner: null,
    history: [
      ...state.history,
      {
        board: state.board,
        turn: state.turn,
        phase: state.phase,
        goatsPlaced: state.goatsPlaced,
        goatsCaptured: state.goatsCaptured,
        lastMove: move,
      },
    ],
  };

  // Check Win Conditions:
  // 1. Tigers win if 5 or more goats captured
  if (nextState.goatsCaptured >= 5) {
    nextState.winner = "T";
    nextState.winReason = "बाघले ५ वटा बाख्रा खाएकाले बाघको विजय भयो ! (Tigers Win by capturing 5 goats)";
    return nextState;
  }

  // 2. Goats win if ALL 4 Tigers are trapped (0 legal tiger moves)
  const trappedTigers = countTrappedTigers(nextState);
  if (trappedTigers === 4) {
    nextState.winner = "G";
    nextState.winReason = "सबै ४ वटा बाघ थुनिएकाले बाख्राको विजय भयो ! (Goats Win by trapping all 4 tigers)";
    return nextState;
  }

  return nextState;
}

// AI ENGINE: Smart Heuristic Move Selector for Tiger and Goat
export function getBestAIMove(
  state: GameState,
  difficulty: "easy" | "medium" | "hard" = "medium"
): Move | null {
  if (state.winner) return null;

  if (state.turn === "T") {
    const tigerMoves = getTigerMoves(state);
    if (tigerMoves.length === 0) return null;

    // 1. Capture moves are top priority for Tiger
    const captureMoves = tigerMoves.filter((m) => !!m.capture);
    if (captureMoves.length > 0) {
      if (difficulty !== "easy" || Math.random() < 0.8) {
        return captureMoves[Math.floor(Math.random() * captureMoves.length)];
      }
    }

    if (difficulty === "easy") {
      return tigerMoves[Math.floor(Math.random() * tigerMoves.length)];
    }

    // Evaluate moves to avoid getting trapped and maximize mobility
    let bestScore = -Infinity;
    let bestMoves: Move[] = [];

    for (const move of tigerMoves) {
      const simulated = applyMove(state, move);
      let score = 0;

      // Bonus if captured
      if (move.capture) score += 100;

      // Penalize being trapped
      const trapped = countTrappedTigers(simulated);
      score -= trapped * 35;

      // Encourage center control (2,2) and high-diagonal nodes
      if (hasDiagonal(move.to.r, move.to.c)) score += 8;
      if (move.to.r === 2 && move.to.c === 2) score += 15;

      // Total mobility of all tigers
      const totalTigerMoves = getTigerMoves(simulated).length;
      score += totalTigerMoves * 3;

      if (score > bestScore) {
        bestScore = score;
        bestMoves = [move];
      } else if (score === bestScore) {
        bestMoves.push(move);
      }
    }

    return bestMoves[Math.floor(Math.random() * bestMoves.length)] || tigerMoves[0];
  } else {
    // Goat Turn AI
    const goatMoves = getGoatMoves(state);
    if (goatMoves.length === 0) return null;

    if (difficulty === "easy") {
      return goatMoves[Math.floor(Math.random() * goatMoves.length)];
    }

    let bestScore = -Infinity;
    let bestMoves: Move[] = [];

    for (const move of goatMoves) {
      const simulated = applyMove(state, move);
      let score = 0;

      // Penalize if this move allows tiger to capture a goat
      const tigerResponses = getTigerMoves(simulated);
      const tigerCaptures = tigerResponses.filter((m) => !!m.capture);
      score -= tigerCaptures.length * 80;

      // Reward trapping tigers
      const trapped = countTrappedTigers(simulated);
      score += trapped * 50;

      // Reward clustering / adjacent goat support
      const adjToNewGoat = getAdjacentPoints(move.to.r, move.to.c);
      let friendlyNeighbors = 0;
      let tigerNeighbors = 0;

      for (const p of adjToNewGoat) {
        if (simulated.board[p.r][p.c] === "G") friendlyNeighbors++;
        if (simulated.board[p.r][p.c] === "T") tigerNeighbors++;
      }

      score += friendlyNeighbors * 6;
      // Blocking tiger closely without being vulnerable
      score += tigerNeighbors * 10;

      if (score > bestScore) {
        bestScore = score;
        bestMoves = [move];
      } else if (score === bestScore) {
        bestMoves.push(move);
      }
    }

    return bestMoves[Math.floor(Math.random() * bestMoves.length)] || goatMoves[0];
  }
}
