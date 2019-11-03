import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { Matrix } from "src/app/lib/game-utilities/matrix";

// Add variables needed for the winning logic below
// Winning logic: https://github.com/alesmit/play-connect-four/blob/master/src/app/game/game-utils.ts
const four = 4;
const numRows = 6;
const numCols = 7;

/**
 * Given a number list, returns the number which is repeated at least ${four} times without any series breaks
 * @param {number[]} values
 * @returns {number}
 */
function checkLine(values: number[]) {
  let last = 0;
  let lastCount = 0;

  for (let i = 0; i < values.length; i++) {
    if (values[i] === last) {
      lastCount++;
    } else {
      last = values[i];
      lastCount = 1;
    }

    if (last !== 0 && lastCount === four) {
      break;
    }
  }

  if (last !== 0 && lastCount === four) {
    return last;
  }

  return 0;
}

/**
 * Given a board (number[][]) as input, return the number of the winner player
 * or null if nobody won yet
 * @param {Matrix} board
 * @returns {PlayerRole}
 */
export function getWinnerValue(board: Matrix): PlayerRole {
  // horizontal check
  for (let i = 0; i < numRows; i++) {
    const playerValue = checkLine(board[i]);
    if (playerValue !== 0) {
      return playerValue;
    }
  }

  // vertical check
  for (let i = 0; i < numCols; i++) {
    const playerValue = checkLine(
      board.map((r, rowIndex) => {
        return board[rowIndex][i];
      })
    );

    if (playerValue !== 0) {
      return playerValue;
    }
  }

  /*
   * Diagonal check 1 (first left to right check)
   *
   * [x][ ][ ][ ][ ][ ][ ]
   * [x][x][ ][ ][ ][ ][ ]
   * [x][x][x][ ][ ][ ][ ]
   * [x][x][x][x][ ][ ][ ]
   * [ ][x][x][x][x][ ][ ]
   * [ ][ ][x][x][x][x][ ]
   * [ ][ ][ ][x][x][x][x]
   *
   */

  for (let i = 0; i <= numRows - four; i++) {
    let row, col;
    let values = [];

    for (row = i, col = 0; row < numRows && col < numCols; row++, col++) {
      values = [...values, board[row][col]];
    }

    const playerValue = checkLine(values);
    if (playerValue !== 0) {
      return playerValue;
    }
  }

  /*
   * Diagonal check 2 (last left to right check)
   *
   * [ ][x][x][x][ ][ ][ ]
   * [ ][ ][x][x][x][ ][ ]
   * [ ][ ][ ][x][x][x][ ]
   * [ ][ ][ ][ ][x][x][x]
   * [ ][ ][ ][ ][ ][x][x]
   * [ ][ ][ ][ ][ ][ ][x]
   * [ ][ ][ ][ ][ ][ ][ ]
   *
   */

  for (let i = 1; i <= numCols - four; i++) {
    let row, col;
    let values = [];

    for (row = 0, col = i; row < numRows && col < numCols; row++, col++) {
      values = [...values, board[row][col]];
    }

    const playerValue = checkLine(values);
    if (playerValue !== 0) {
      return playerValue;
    }
  }

  /*
   * Diagonal check 3 (first right to left check)
   *
   * [ ][ ][ ][x][x][x][x]
   * [ ][ ][x][x][x][x][ ]
   * [ ][x][x][x][x][ ][ ]
   * [x][x][x][x][ ][ ][ ]
   * [x][x][x][ ][ ][ ][ ]
   * [x][x][ ][ ][ ][ ][ ]
   * [x][ ][ ][ ][ ][ ][ ]
   *
   */

  for (let i = four - 1; i < numCols; i++) {
    let row, col;
    let values = [];

    for (row = 0, col = i; row < numRows && col >= 0; row++, col--) {
      values = [...values, board[row][col]];
    }

    const playerValue = checkLine(values);
    if (playerValue !== 0) {
      return playerValue;
    }
  }

  /*
   * Diagonal check 4 (last right to left check)
   *
   * [ ][ ][ ][ ][ ][ ][ ]
   * [ ][ ][ ][ ][ ][ ][x]
   * [ ][ ][ ][ ][ ][x][x]
   * [ ][ ][ ][ ][x][x][x]
   * [ ][ ][ ][x][x][x][ ]
   * [ ][ ][x][x][x][ ][ ]
   * [ ][x][x][x][ ][ ][ ]
   *
   */

  for (let i = 1; i <= numRows - four; i++) {
    let row, col;
    let values = [];

    for (row = i, col = numCols - 1; row < numRows && col >= 0; row++, col--) {
      values = [...values, board[row][col]];
    }

    const playerValue = checkLine(values);
    if (playerValue !== 0) {
      return playerValue;
    }
  }

  return null;
}
