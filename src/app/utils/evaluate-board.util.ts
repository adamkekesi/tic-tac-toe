export enum BoardStatus {
  InProgress,
  Player1Wins,
  Player2Wins,
  Draw,
}

enum CheckResult {
  NoWinner = 0,
  Player1Wins = 1,
  Player2Wins = 2,
}

// As of now, it can only evaluate a 3x3 board
export function evaluateBoard(board: number[]): BoardStatus {
  let result = checkVertically(board);
  if (result !== CheckResult.NoWinner) {
    return result as number;
  }

  result = checkHorizontally(board);
  if (result !== CheckResult.NoWinner) {
    return result as number;
  }

  result = checkDiagonally(board);
  if (result !== CheckResult.NoWinner) {
    return result as number;
  }

  if (board.includes(0)) {
    return BoardStatus.InProgress;
  }

  return BoardStatus.Draw;
}

function checkVertically(board: number[]): CheckResult {
  for (let i = 0; i < 3; i++) {
    const firstRow = board[i];
    if (firstRow === 0) {
      continue;
    }

    let isSame = true;

    for (let j = 1; j < 3; j++) {
      if (board[i + j * 3] !== firstRow) {
        isSame = false;
        break;
      }
    }

    if (isSame) {
      return firstRow;
    }
  }

  return 0;
}

function checkHorizontally(board: number[]): CheckResult {
  for (let i = 0; i < 3; i++) {
    const firstColumn = board[i * 3];
    if (firstColumn === 0) {
      continue;
    }

    let isSame = true;

    for (let j = 1; j < 3; j++) {
      if (board[i * 3 + j] !== firstColumn) {
        isSame = false;
        break;
      }
    }

    if (isSame) {
      return firstColumn;
    }
  }

  return 0;
}

function checkDiagonally(board: number[]): CheckResult {
  const center = board[4];

  if (center === 0) {
    return 0;
  }

  if (board[0] === center && board[8] === center) {
    return center;
  }

  if (board[2] === center && board[6] === center) {
    return center;
  }

  return 0;
}
