import { Matrix } from "../lib/game-utilities/matrix";
import { PlayerRole } from "../shared/enums/player-role.enum";

export interface Match {
  id: string;
  board: Matrix;
  player1: PlayerRole;
  player2: PlayerRole;
  activePlayer: PlayerRole;
  winnerPlayer: PlayerRole;
  players: string[];
  end: boolean;
}
