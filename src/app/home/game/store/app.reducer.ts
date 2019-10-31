import { Action, createReducer, on, State } from "@ngrx/store";
import * as matchActions from "./app.actions";
import { AppState } from "./app.state";
import { GameService } from "src/app/shared/services/game.service";

const initialState: AppState = {
  matchId: null,
  matchBoard: [],
  playerOne: null,
  playerTwo: null,
  activePlayer: null,
  winnerPlayer: null,
  players: [],
  endMatch: false
};

const matchReducer = createReducer(
  initialState,
  on(matchActions.startMatch, (state: AppState, { game }) => ({
    ...state,
    matchId: game.matchId,
    matchBoard: game.matchBoard,
    playerOne: game.playerOne,
    activePlayer: game.activePlayer,
    players: game.players
  })),
  on(matchActions.joinMatch, (state: AppState, { id }) => ({
    ...state,
    matchId: id
  })),
  on(matchActions.setInitialBoard, (state: AppState, { initialBoard }) => ({
    ...state,
    matchBoard: initialBoard
  })),
  on(matchActions.selectBoardCell, (state: AppState, { col, row }) => ({
    ...state,
    matchBoard: [col[row]]
  })),
  on(matchActions.endMatch, (state: AppState) => ({
    ...state,
    endMatch: true
  })),
  on(matchActions.setFirstPlayerToMatch, (state: AppState, { playerRole }) => {
    const playersArr = state.players;
    playersArr.push(playerRole);
    return {
      ...state,
      players: playersArr
    };
  }),
  on(matchActions.setSecondPlayerToMatch, (state: AppState, { playerRole }) => {
    const playersArr = state.players;
    playersArr.push(playerRole);
    return {
      ...state,
      players: playersArr
    };
  }),
  on(matchActions.updateActivePlayer, (state: AppState, { playerRole }) => ({
    ...state,
    activePlayer: playerRole
  })),
  on(matchActions.updateWinnerPlayer, (state: AppState, { playerRole }) => ({
    ...state,
    winnerPlayer: playerRole
  })),
  // on(matchActions.setPlayerRole, (state: AppState, { playerRole }) => ({
  //   ...state,
  //   winnerPlayer: playerRole
  // })),
  on(matchActions.setPlayerOne, (state: AppState, { playerOne }) => ({
    ...state,
    playerOne
  })),
  on(matchActions.setPlayerTwo, (state: AppState, { playerTwo }) => ({
    ...state,
    playerTwo
  }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return matchReducer(state, action);
}
