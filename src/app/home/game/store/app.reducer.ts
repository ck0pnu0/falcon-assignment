import { Match } from "src/app/models/match.model";
import { createReducer, Action } from "@ngrx/store";
import * as matchActions from "./app.actions";

export const initialState: Match = {
  id: null,
  board: [],
  activePlayer: null,
  winnerPlayer: null,
  players: [],
  end: false
};

const matchReducer = createReducer(initialState);
// , on(matchActions....));

export function reducer(state: Match | undefined, action: Action) {
  return matchReducer(state, action);
}
