import { createAction, props } from "@ngrx/store";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { Player } from "src/app/models/player.model";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { AppState } from "./app.state";

export enum MatchActionTypes {
  START_MATCH = "[Match] Start Match",
  JOIN_MATCH = "[Match] Join Match",
  SET_INITIAL_BOARD = "[Match] Set Initial Board",
  SELECT_CELL = "[Match] Select Board Cell",
  END_MATCH = "[Match] End Match and Update Winner Player",
  LEAVE_MATCH = "[Match] Leave Match and Reset Game",
  FIRST_PLAYER_MATCH = "[Match] Set First Player to Match",
  SECOND_PLAYER_MATCH = "[Match] Set Second Player to Match",
  ACTIVE_PLAYER = "[Match Players] Update Active Player",
  WINNER_PLAYER = "[Match Players] Update Winning Player",
  PLAYER_ONE = "[Match Players] Set Player One",
  PLAYER_TWO = "[Match Players] Set Player Two",
  SET_DATA_FROM_LOCAL_STORAGE = "[Match] Set Game data from Local Storage"
}

// Match
export const startMatch = createAction(
  MatchActionTypes.START_MATCH,
  props<{ game: Partial<AppState> }>()
);
export const joinMatch = createAction(
  MatchActionTypes.JOIN_MATCH,
  props<{ id: string }>()
);
export const setInitialBoard = createAction(
  MatchActionTypes.SET_INITIAL_BOARD,
  props<{ initialBoard: Matrix }>()
);
export const selectBoardCell = createAction(
  MatchActionTypes.SELECT_CELL,
  props<{ newBoard: Matrix }>()
);
export const endMatch = createAction(
  MatchActionTypes.END_MATCH,
  props<{ matchEnded: boolean }>()
);
export const leaveMatch = createAction(MatchActionTypes.LEAVE_MATCH);
export const setFirstPlayerToMatch = createAction(
  MatchActionTypes.FIRST_PLAYER_MATCH,
  props<{ playerRole: PlayerRole }>()
);
export const setSecondPlayerToMatch = createAction(
  MatchActionTypes.SECOND_PLAYER_MATCH,
  props<{ playerRole: PlayerRole }>()
);

// Players
export const updateActivePlayer = createAction(
  MatchActionTypes.ACTIVE_PLAYER,
  props<{ playerRole: PlayerRole }>()
);
export const updateWinnerPlayer = createAction(
  MatchActionTypes.WINNER_PLAYER,
  props<{ playerRole: PlayerRole }>()
);
export const setPlayerOne = createAction(
  MatchActionTypes.PLAYER_ONE,
  props<{ playerOne: Player }>()
);
export const setPlayerTwo = createAction(
  MatchActionTypes.PLAYER_TWO,
  props<{ playerTwo: Player }>()
);
export const setGameStateFromLocalStorage = createAction(
  MatchActionTypes.SET_DATA_FROM_LOCAL_STORAGE,
  props<{ game: AppState }>()
);
