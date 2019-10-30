import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { Matrix } from "../../../lib/game-utilities/matrix";
import { Player } from "../../../models/player.model";

export class MatchState {
  static stateName = "MatchState";
  matchId: string;
  matchBoard: Matrix;
  playerOne: Player;
  playerTwo: Player;
  activePlayer: PlayerRole;
  winnerPlayer: PlayerRole;
  players: number[];
  endMatch: boolean;
}
