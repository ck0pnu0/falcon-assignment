import { Matrix } from "../../../lib/game-utilities/matrix";
import { Player } from "../../../models/player.model";

export class MatchState {
  static stateName = "MatchState";
  matchId: string;
  matchBoard: Matrix;
  activePlayer: Player;
  winnerPlayer: Player;
  players: string[];
  endMatch: boolean;
}
