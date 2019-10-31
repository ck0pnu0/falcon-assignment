import { Matrix } from "../../../lib/game-utilities/matrix";
import { Player } from "../../../models/player.model";
import { PlayerRole } from "../../../shared/enums/player-role.enum";

export class AppState {
  static stateName = "AppState";
  matchId: string;
  matchBoard: Matrix;
  playerOne: Player;
  playerTwo: Player;
  activePlayer: PlayerRole;
  winnerPlayer: PlayerRole;
  players: number[];
  endMatch: boolean;
}
