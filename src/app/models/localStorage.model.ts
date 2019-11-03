import { Player } from "./player.model";
import { Matrix } from "../lib/game-utilities/matrix";
import { PlayerRole } from "../shared/enums/player-role.enum";

export interface LocalStorageData {
  matchId: string;
  matchBoard: Matrix;
  playerOne: Player;
  playerTwo: Player;
  activePlayer: PlayerRole;
  winnerPlayer: PlayerRole;
  players: Player[];
  endMatch: boolean;
}
