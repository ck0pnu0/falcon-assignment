import { PlayerRole } from "../shared/enums/player-role.enum";

export interface LocalStorageData {
  playerId: string;
  match: {
    [matchId: string]: PlayerRole;
  };
}
