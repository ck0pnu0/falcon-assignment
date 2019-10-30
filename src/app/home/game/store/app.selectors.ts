import { createSelector } from "@ngrx/store";
import { Player } from "../../../models/player.model";
import { PlayerRole } from "../../../shared/enums/player-role.enum";
import { MatchState } from "./app.state";

export const playerOne = (state: MatchState) => state.playerOne;
export const playerTwo = (state: MatchState) => state.playerTwo;
export const playerActive = (state: MatchState) => state.activePlayer;
export const playerWinner = (state: MatchState) => state.winnerPlayer;

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
