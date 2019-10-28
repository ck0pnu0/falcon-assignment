import { createAction, props } from "@ngrx/store";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";

// Match
export const startMatch = createAction(
  "[Match] Start Match",
  props<{ matchId: string }>()
); // this will also create a new board (empty)
export const joinMatch = createAction(
  "[Match] Join Match",
  props<{ matchId: string }>()
);
export const selectBoardCell = createAction(
  "[Match] Select Board Cell",
  props<{ col: number; row: number }>()
);
export const endMatch = createAction(
  "[Match] End Match and Update Winner Player",
  props<{ matchId: string; playerWin: PlayerRole; matchEnd: boolean }>()
);

// Players
export const updateActivePlayer = createAction(
  "[Match Players] Update Active Player",
  props<{ playerRole: PlayerRole }>()
);
export const updateWinnerPlayer = createAction(
  "[Match Players] Update Winning Player",
  props<{ playerRole: PlayerRole }>()
);
export const setPlayerRole = createAction(
  "[Match Players] Update Player Role",
  props<{ playerRole: PlayerRole }>()
);
export const setPlayerOne = createAction(
  "[Match Players] Set Player One",
  props<{ playerRole: PlayerRole }>()
);
export const setPlayerTwo = createAction(
  "[Match Players] Set Player Two",
  props<{ playerRole: PlayerRole }>()
);
