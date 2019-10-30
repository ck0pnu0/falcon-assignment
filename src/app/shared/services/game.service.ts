import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { generateMatrixModel } from "src/app/lib/game-utilities/matrix";
import { Board } from "src/app/models/board.model";
import { CreateMatchData } from "src/app/models/created-match.model";
import { Match } from "../../models/match.model";
import { Player } from "../../models/player.model";
import { PlayerRole } from "../enums/player-role.enum";
import { LocalStorageService } from "./local-storage.service";
import {
  setPlayerOne,
  setInitialBoard,
  updateActivePlayer,
  setFirstPlayerToMatch
} from "src/app/home/game/store/app.actions";

@Injectable()
export class GameService {
  // add store as dep to this service
  // private store: Store
  constructor(
    private storage: LocalStorageService,
    private store: Store<Match>
  ) {}

  private getInitialMatchData(data: CreateMatchData) {
    // set host player data
    const player: Player = {
      id: this.storage.getPlayerOneId(),
      role: PlayerRole.Player1
    };
    this.store.dispatch(setPlayerOne({ firstPlayer: player }));
    // get a brand new board
    const board = generateMatrixModel(7, 6);
    this.store.dispatch(setInitialBoard({ initialBoard: board }));
    this.store.dispatch(updateActivePlayer({ playerRole: player.role }));
    this.store.dispatch(setFirstPlayerToMatch({ playerRole: player.role }));

    // use dispatch an action for this
    // this.store.select(); // whole match state for return
    // return {
    //   activePlayer: player.role,
    //   board,
    //   players: [player.id]
    // };
  }

  createMatch() {
    const matchId = "someId" || null; // get this from the store if there isn't create it
    this.storage.setMatchId(matchId);
    // set matchId for the match in store (action)
  }

  matchExists(matchId: string) {
    // Check in store if this matchId exists
  }

  getMatchId(): string {
    return this.storage.getMatchId();
  }

  board$() {
    //: Observable<Board>
    // return board from the store
  }

  setBoard(board: Board) {
    // set board to store
  }

  activePlayer$() {
    //: Observable<Player>
    // get activePlayer state from the store (player1 or player2)
  }

  setActivePlayer(player: Player) {
    // set activePlayer state
  }

  winnerPlayer$() {
    //: Observable<Player>
    // get winnerPlayer from the store
  }

  endMatch(winnerPlayer: Player) {
    // set state for ending the game/match
    // set winnerPlayer to this game/match
  }

  players$() {
    //: Observable<Players>
    // get players from the game/Match (should be a length of 2)
  }

  setMeAsPlayer2(name: string) {
    const player: Player = {
      id: this.storage.getPlayerTwoId(),
      role: PlayerRole.Player2
    };
    const matchId = "someId"; // get matchID from store
    this.storage.setPlayerTwo();

    // set player2 to the game/match - players state
  }
}
