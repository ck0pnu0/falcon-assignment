import { createSelector } from "@ngrx/store";
import { Player } from "../../../models/player.model";
import { PlayerRole } from "../../../shared/enums/player-role.enum";
import { AppState } from "./app.state";
import { Matrix } from "src/app/lib/game-utilities/matrix";

export const matchState = (state: AppState) => state;
export const matchId = (state: AppState) => state.matchId;
export const matchBoard = (state: AppState) => state.matchBoard;
export const playerOne = (state: AppState) => state.playerOne;
export const playerTwo = (state: AppState) => state.playerTwo;
export const playerActive = (state: AppState) => state.activePlayer;
export const playerWinner = (state: AppState) => state.winnerPlayer;
export const players = (state: AppState) => state.players;

export const getMatchState = createSelector(
  matchState,
  (state: AppState) => state
);

export const getMatchId = createSelector(
  matchId,
  (state: string) => state
);

export const getMatchBoard = createSelector(
  matchBoard,
  (state: Matrix) => state
);

export const getPlayerOne = createSelector(
  playerOne,
  (state: Player) => state
);
export const getPlayerTwo = createSelector(
  playerTwo,
  (state: Player) => state
);

export const activePlayerRole = createSelector(
  playerActive,
  (state: PlayerRole) => state
);
export const winnerPlayerRole = createSelector(
  playerWinner,
  (state: PlayerRole) => state
);

export const getPlayersArr = createSelector(
  players,
  (state: PlayerRole[]) => state
);
