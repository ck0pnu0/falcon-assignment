import { Matrix } from "../lib/game-utilities/matrix";
import { Player } from "./player.model";

export interface Match {
  id: string;
  board: Matrix;
  activePlayer: Player;
  winnerPlayer: Player;
  players: string[];
  end: boolean;
}
