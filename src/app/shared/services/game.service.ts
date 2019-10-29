import { Injectable } from "@angular/core";
import { Match } from "../../models/match.model";
import { Player } from "../../models/player.model";
import { PlayerRole } from "../enums/player-role.enum";
import { CreateMatchData } from "src/app/models/created-match.model";
import { Observable } from "rxjs";
import { Board } from "src/app/models/board.model";
import { LocalStorageService } from "./local-storage.service";
import { generateMatrixModel } from "src/app/lib/game-utilities/matrix";

@Injectable()
export class GameService {
  // add store as dep to this service
  // private store: Store
  constructor(private storage: LocalStorageService) {}

  private getInitialMatchData(data: CreateMatchData): Partial<Match> {
    // set host player data
    const player: Player = {
      id: this.storage.getPlayerOneId(),
      role: PlayerRole.Player1
      // name: data.player1Name
    };

    // get a brand new board
    const board = generateMatrixModel(7, 6);

    // use dispatch an action for this
    return {
      activePlayer: player.role,
      board,
      players: [player.id]
    };
  }

  createMatch(data: CreateMatchData) {
    const matchId = "someId" || null; // get this from the store if there isn't create it
    const match = this.getInitialMatchData(data); // replace with dispatch an action

    this.storage.setMatchId(matchId);
    // set matchId for the match in store

    // dispatch an action for creating a new Match (start game);
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
