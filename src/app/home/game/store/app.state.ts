import { Matrix } from "src/app/lib/game-utilities/matrix";
import { Player } from "src/app/models/player.model";

export class MatchState {
  static stateName = "MatchState";
  matchId: string;
  matchBoard: Matrix;
  activePlayer: Player;
  winnerPlayer: Player;
  players: string[];
  endMatch: boolean;
}
