import { BoardStatus, evaluateBoard } from './evaluate-board.util';

interface BoardTestData {
  board: number[];
  result: BoardStatus;
}

describe('evaluateBoard', function () {
  it('should return InProgress if the game is not over', function () {
    const boards = [
      {
        board: [0, 0, 0, 1, 0, 2, 2, 1, 0],
        result: BoardStatus.InProgress,
      },
    ];

    checkBoards(boards);
  });

  it('should check winner horizontally', function () {
    const boards = [
      {
        board: [1, 1, 1, 0, 0, 2, 2, 0, 2],
        result: BoardStatus.Player1Wins,
      },
      {
        board: [2, 2, 0, 1, 1, 1, 2, 0, 2],
        result: BoardStatus.Player1Wins,
      },
      {
        board: [2, 2, 0, 1, 2, 0, 1, 1, 1],
        result: BoardStatus.Player1Wins,
      },
    ];

    checkBoards(boards);
  });

  it('should check winner vertically', function () {
    const boards = [
      {
        board: [2, 0, 0, 2, 1, 0, 2, 0, 1],
        result: BoardStatus.Player2Wins,
      },
      {
        board: [1, 2, 0, 1, 2, 0, 2, 2, 1],
        result: BoardStatus.Player2Wins,
      },
      {
        board: [0, 1, 2, 1, 0, 2, 0, 0, 2],
        result: BoardStatus.Player2Wins,
      },
    ];

    checkBoards(boards);
  });

  it('should check winner diagonally', function () {
    const boards = [
      {
        board: [1, 0, 0, 2, 1, 0, 2, 0, 1],
        result: BoardStatus.Player1Wins,
      },
      {
        board: [1, 0, 2, 1, 2, 0, 2, 1, 0],
        result: BoardStatus.Player2Wins,
      },
    ];

    checkBoards(boards);
  });

  it('should check for draws', function () {
    const boards = [
      {
        board: [1, 2, 1, 2, 1, 2, 2, 1, 2],
        result: BoardStatus.Draw,
      },
    ];

    checkBoards(boards);
  });
});

function checkBoards(boards: BoardTestData[]) {
  for (const boardTestData of boards) {
    const result = evaluateBoard(boardTestData.board);
    expect(result).toBe(boardTestData.result);
  }
}
