import { PlayerRole } from "../shared/enums/player-role.enum";

export interface Player {
  id: string;
  name: string;
  /**
   * Player's role: host (Player1) or guest (Player2)
   */
  role: PlayerRole;
}
