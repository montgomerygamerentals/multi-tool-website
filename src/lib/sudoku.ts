export type Difficulty = "easy" | "medium" | "hard";

export type Board = number[][];

const SIZE = 9;
const BOX = 3;

const CLUE_COUNTS: Record<Difficulty, number> = {
  easy: 40,
  medium: 32,
  hard: 26,
};

export function emptyBoard(): Board {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function isValidPlacement(
  board: Board,
  row: number,
  col: number,
  num: number,
): boolean {
  for (let i = 0; i < SIZE; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  const boxRow = Math.floor(row / BOX) * BOX;
  const boxCol = Math.floor(col / BOX) * BOX;
  for (let r = 0; r < BOX; r++) {
    for (let c = 0; c < BOX; c++) {
      if (board[boxRow + r][boxCol + c] === num) return false;
    }
  }
  return true;
}

function findEmpty(board: Board): [number, number] | null {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return [r, c];
    }
  }
  return null;
}

function fillBoard(board: Board): boolean {
  const empty = findEmpty(board);
  if (!empty) return true;
  const [row, col] = empty;
  for (const num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num;
      if (fillBoard(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

function countSolutions(board: Board, limit = 2): number {
  const empty = findEmpty(board);
  if (!empty) return 1;
  const [row, col] = empty;
  let count = 0;
  for (let num = 1; num <= SIZE; num++) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num;
      count += countSolutions(board, limit);
      board[row][col] = 0;
      if (count >= limit) return count;
    }
  }
  return count;
}

export function boardsEqual(a: Board, b: Board): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

export function isComplete(board: Board): boolean {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  return true;
}

export function getConflicts(board: Board): Set<string> {
  const conflicts = new Set<string>();

  const markDupes = (cells: [number, number][]) => {
    const seen = new Map<number, [number, number][]>();
    for (const [r, c] of cells) {
      const val = board[r][c];
      if (val === 0) continue;
      const list = seen.get(val) ?? [];
      list.push([r, c]);
      seen.set(val, list);
    }
    for (const list of seen.values()) {
      if (list.length > 1) {
        for (const [r, c] of list) conflicts.add(`${r}-${c}`);
      }
    }
  };

  for (let r = 0; r < SIZE; r++) {
    markDupes(Array.from({ length: SIZE }, (_, c) => [r, c]));
  }
  for (let c = 0; c < SIZE; c++) {
    markDupes(Array.from({ length: SIZE }, (_, r) => [r, c]));
  }
  for (let br = 0; br < BOX; br++) {
    for (let bc = 0; bc < BOX; bc++) {
      const cells: [number, number][] = [];
      for (let r = 0; r < BOX; r++) {
        for (let c = 0; c < BOX; c++) {
          cells.push([br * BOX + r, bc * BOX + c]);
        }
      }
      markDupes(cells);
    }
  }

  return conflicts;
}

export interface SudokuPuzzle {
  puzzle: Board;
  solution: Board;
  difficulty: Difficulty;
}

export function generateSudoku(difficulty: Difficulty): SudokuPuzzle {
  const solution = emptyBoard();
  fillBoard(solution);

  const puzzle = cloneBoard(solution);
  const positions = shuffle(
    Array.from({ length: SIZE * SIZE }, (_, i) => [Math.floor(i / SIZE), i % SIZE] as [
      number,
      number,
    ]),
  );

  const targetClues = CLUE_COUNTS[difficulty];
  let clues = SIZE * SIZE;

  for (const [row, col] of positions) {
    if (clues <= targetClues) break;
    const backup = puzzle[row][col];
    puzzle[row][col] = 0;

    // Uniqueness checks get expensive as clues drop; skip them for early removals
    const checkUnique = clues <= targetClues + 12;
    if (checkUnique) {
      const test = cloneBoard(puzzle);
      if (countSolutions(test, 2) !== 1) {
        puzzle[row][col] = backup;
        continue;
      }
    }
    clues--;
  }

  return { puzzle, solution, difficulty };
}
