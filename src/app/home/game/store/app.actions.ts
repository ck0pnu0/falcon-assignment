import { createAction, props } from "@ngrx/store";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";

// Match
export const startMatch = createAction("[Match] Start Match");
export const joinMatch = createAction(
  "[Match] Join Match",
  props<{ matchId: string }>()
);
export const selectBoardCell = createAction(
  "[Match] Select Board Cell",
  props<{ col: number; row: number }>()
);
export const leaveMatch = createAction(
  "[Match] Leave Match and update Winner Player",
  props<{ matchId: string; winnerPlayer: string; end: boolean }>()
);
export const endMatch = createAction(
  "[Match] End Match and Update Winner Player",
  props<{ winnerPlayer: string; end: boolean }>()
);

// Players
export const updateActivePlayer = createAction(
  "[Match] Update Active Player",
  props<{ id: string; name: string; role: PlayerRole }>()
);
export const updateWinnerPlayer = createAction(
  "[Match] Update Winning Player",
  props<{ id: string; name: string; role: PlayerRole }>()
);
export const setPlayerRole = createAction(
  "[Match] Update Player Role",
  props<{ id: string; name: string; role: PlayerRole }>()
);
