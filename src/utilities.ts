import type { BoardData, Player } from './types';

export function isEqualTo(currentPlayer: Player): (square: Player) => boolean {
  return function (square: Player): boolean {
    return square === currentPlayer;
  };
}

export function getIsWinner(
  boardData: BoardData,
  currentPlayer: Player
): boolean {
  const BOARD_SIZE: number = boardData.length;

  const diagonalA: Array<Player> = [];
  const diagonalB: Array<Player> = [];

  for (let i = 0; i <= BOARD_SIZE - 1; i++) {
    // check row
    if (boardData[i].every(isEqualTo(currentPlayer))) {
      return true;
    }

    // build diagonal arrays
    diagonalA.push(boardData[i][i]);
    diagonalB.push(boardData[i][BOARD_SIZE - 1 - i]);

    // build and check column
    const column: Array<Player> = [];
    for (let j = 0; j <= BOARD_SIZE - 1; j++) {
      column.push(boardData[j][i]);
    }
    if (column.every(isEqualTo(currentPlayer))) {
      return true;
    }
  }

  // check diagonals
  if (
    diagonalA.every(isEqualTo(currentPlayer)) ||
    diagonalB.every(isEqualTo(currentPlayer))
  ) {
    return true;
  }

  return false;
}
