import { Match } from "src/app/models/match.model";
import { createReducer, Action, on, props } from "@ngrx/store";
import * as matchActions from "./app.actions";

const initialState: Match = {
  id: null,
  board: [],
  player1: null,
  player2: null,
  activePlayer: null,
  winnerPlayer: null,
  players: [],
  end: false
};

const matchReducer = createReducer(
  initialState,
  on(matchActions.startMatch, (state: Match, { matchId }) => ({
    ...state,
    id: matchId
  })),
  on(matchActions.joinMatch, (state: Match, { matchId }) => ({
    ...state,
    id: matchId
  })),
  on(matchActions.selectBoardCell, (state: Match, { col, row }) => ({
    ...state,
    board: [col[row]]
  })),
  on(
    matchActions.endMatch,
    (state: Match, { matchId, playerWin, matchEnd }) => ({
      ...state,
      id: matchId,
      winnerPlayer: playerWin,
      end: matchEnd
    })
  ),
  on(matchActions.updateActivePlayer, (state: Match, { playerRole }) => ({
    ...state,
    activePlayer: playerRole
  })),
  on(matchActions.updateWinnerPlayer, (state: Match, { playerRole }) => ({
    ...state,
    winnerPlayer: playerRole
  })),
  on(matchActions.setPlayerRole, (state: Match, { playerRole }) => ({
    ...state,
    winnerPlayer: playerRole
  })),
  on(matchActions.setPlayerOne, (state: Match, { playerRole }) => ({
    ...state,
    player1: playerRole
  })),
  on(matchActions.setPlayerTwo, (state: Match, { playerRole }) => ({
    ...state,
    player2: playerRole
  }))
);

export function reducer(state: Match | undefined, action: Action) {
  return matchReducer(state, action);
}
