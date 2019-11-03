import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const APP_KEY = "game";

const getAppState = createFeatureSelector<AppState>(APP_KEY);

export const getMatchState = createSelector(
  getAppState,
  (state: AppState) => state
);

export const getMatchId = createSelector(
  getAppState,
  (state: AppState) => state.matchId
);

export const getMatchBoard = createSelector(
  getAppState,
  (state: AppState) => state.matchBoard
);

export const getPlayerOne = createSelector(
  getAppState,
  (state: AppState) => state.playerOne
);

export const getPlayerTwo = createSelector(
  getAppState,
  (state: AppState) => state.playerTwo
);

export const activePlayerRole = createSelector(
  getAppState,
  (state: AppState) => state.activePlayer
);
export const winnerPlayerRole = createSelector(
  getAppState,
  (state: AppState) => state.winnerPlayer
);

export const getPlayersArr = createSelector(
  getAppState,
  (state: AppState) => state.players
);
