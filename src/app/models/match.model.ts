import { Matrix } from "../lib/game-utilities/matrix";
import { PlayerRole } from "../shared/enums/player-role.enum";
import { Player } from "./player.model";

export interface Match {
  id: string;
  board: Matrix;
  playerOne: Player;
  playerTwo: Player;
  activePlayer: PlayerRole;
  winnerPlayer: PlayerRole;
  players: number[];
  end: boolean;
}
