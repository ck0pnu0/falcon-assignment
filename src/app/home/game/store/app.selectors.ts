import { createSelector } from "@ngrx/store";
import { Player } from "../../../models/player.model";
import { MatchState } from "./app.state";

// export const playerOneRole = (state: MatchState) => state.playerOne;
// export const playerTwoRole = (state: MatchState) => state.playerTwo;
export const playerActive = (state: MatchState) => state.activePlayer;
export const playerWinner = (state: MatchState) => state.winnerPlayer;

export const activePlayerRole = createSelector(
  playerActive,
  (state: Player) => state.role
);
export const winnerPlayerRole = createSelector(
  playerWinner,
  (state: Player) => state.role
);
