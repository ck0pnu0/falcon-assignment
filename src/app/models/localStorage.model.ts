import { Player } from "./player.model";

export interface LocalStorageData {
  playerOne: Player;
  playerTwo: Player;
  matchId: string;
}
