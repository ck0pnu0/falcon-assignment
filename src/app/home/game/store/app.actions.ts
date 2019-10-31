import { createAction, props } from "@ngrx/store";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { Player } from "src/app/models/player.model";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { AppState } from "./app.state";

// Match
export const startMatch = createAction(
  "[Match] Start Match",
  props<{ game: AppState }>()
); // this will also create a new board (empty)
export const joinMatch = createAction(
  "[Match] Join Match",
  props<{ id: string }>()
);
export const setInitialBoard = createAction(
  "[Match] Set Initial Board",
  props<{ initialBoard: Matrix }>()
);
export const selectBoardCell = createAction(
  "[Match] Select Board Cell",
  props<{ col: number; row: number }>()
);
export const endMatch = createAction(
  "[Match] End Match and Update Winner Player"
);
export const setFirstPlayerToMatch = createAction(
  "[Match] Set First Player to Match",
  props<{ playerRole: PlayerRole }>()
);
export const setSecondPlayerToMatch = createAction(
  "[Match] Set Second Player to Match",
  props<{ playerRole: PlayerRole }>()
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
export const setPlayerOne = createAction(
  "[Match Players] Set Player One",
  props<{ playerOne: Player }>()
);
export const setPlayerTwo = createAction(
  "[Match Players] Set Player Two",
  props<{ playerTwo: Player }>()
);
