import { Action, createReducer, on } from "@ngrx/store";
import * as matchActions from "./app.actions";
import { AppState } from "./app.state";

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
  on(matchActions.startMatch, (state, { game }) => ({
    ...state,
    matchId: game.matchId,
    matchBoard: game.matchBoard,
    playerOne: game.playerOne,
    activePlayer: game.activePlayer,
    players: game.players
  })),
  on(matchActions.joinMatch, (state, { id }) => ({
    ...state,
    matchId: id
  })),
  on(matchActions.setInitialBoard, (state, { initialBoard }) => ({
    ...state,
    matchBoard: initialBoard
  })),
  on(matchActions.selectBoardCell, (state, { col, row }) => ({
    ...state,
    matchBoard: [col[row]]
  })),
  on(matchActions.endMatch, (state, { matchEnded }) => ({
    ...state,
    endMatch: matchEnded
  })),
  on(matchActions.leaveMatch, state => initialState),
  on(matchActions.setFirstPlayerToMatch, (state, { playerRole }) => {
    const playersArr = state.players;
    playersArr.push(playerRole);
    return {
      ...state,
      players: playersArr
    };
  }),
  on(matchActions.setSecondPlayerToMatch, (state, { playerRole }) => {
    const playersArr = state.players;
    playersArr.push(playerRole);
    return {
      ...state,
      players: playersArr
    };
  }),
  on(matchActions.updateActivePlayer, (state, { playerRole }) => ({
    ...state,
    activePlayer: playerRole
  })),
  on(matchActions.updateWinnerPlayer, (state, { playerRole }) => ({
    ...state,
    winnerPlayer: playerRole
  })),
  // on(matchActions.setPlayerRole, (state, { playerRole }) => ({
  //   ...state,
  //   winnerPlayer: playerRole
  // })),
  on(matchActions.setPlayerOne, (state, { playerOne }) => ({
    ...state,
    playerOne
  })),
  on(matchActions.setPlayerTwo, (state, { playerTwo }) => ({
    ...state,
    playerTwo
  }))
);

export function reducer(state: AppState = initialState, action: Action) {
  return matchReducer(state, action);
}
