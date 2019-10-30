import { Action, createReducer, on } from "@ngrx/store";
// import { Match } from "../../../models/match.model";
import * as matchActions from "./app.actions";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { MatchState } from "./app.state";

const initialState: Match = {
  id: null,
  board: [],
  playerOne: null,
  playerTwo: null,
  activePlayer: null,
  winnerPlayer: null,
  players: [],
  end: false
};

const matchReducer = createReducer(
  initialState,
  on(matchActions.startMatch, (state: MatchState, { matchId }) => ({
    ...state,
    matchId: matchId
  })),
  on(matchActions.joinMatch, (state: MatchState, { matchId }) => ({
    ...state,
    matchId: matchId
  })),
  on(matchActions.setInitialBoard, (state: MatchState, { initialBoard }) => ({
    ...state,
    matchBoard: initialBoard
  })),
  on(matchActions.selectBoardCell, (state: MatchState, { col, row }) => ({
    ...state,
    matchBoard: [col[row]]
  })),
  on(
    matchActions.endMatch,
    (state: MatchState, { matchId, playerWin, matchEnd }) => ({
      ...state,
      matchId: matchId,
      winnerPlayer: playerWin,
      endMatch: matchEnd
    })
  ),
  on(
    matchActions.setFirstPlayerToMatch,
    (state: MatchState, { playerRole }) => {
      const playersArr = state.players;
      playersArr.push(playerRole);
      return {
        ...state,
        players: playersArr
      };
    }
  ),
  on(
    matchActions.setSecondPlayerToMatch,
    (state: MatchState, { playerRole }) => {
      const playersArr = state.players;
      playersArr.push(playerRole);
      return {
        ...state,
        players: playersArr
      };
    }
  ),
  on(matchActions.updateActivePlayer, (state: MatchState, { playerRole }) => ({
    ...state,
    activePlayer: playerRole
  })),
  on(matchActions.updateWinnerPlayer, (state: MatchState, { playerRole }) => ({
    ...state,
    winnerPlayer: playerRole
  })),
  // on(matchActions.setPlayerRole, (state: MatchState, { playerRole }) => ({
  //   ...state,
  //   winnerPlayer: playerRole
  // })),
  on(matchActions.setPlayerOne, (state: MatchState, { firstPlayer }) => ({
    ...state,
    playerOne: firstPlayer
  })),
  on(matchActions.setPlayerTwo, (state: MatchState, { secondPlayer }) => ({
    ...state,
    playerTwo: secondPlayer
  }))
);

export function reducer(state: Match | undefined, action: Action) {
  return matchReducer(state, action);
}
