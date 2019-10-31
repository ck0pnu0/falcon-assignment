import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/home/game/store/app.state";
import * as fromActions from "../../home/game/store/app.actions";
import * as fromGame from "../../home/game/store/app.selectors";
import { generateMatrixModel, Matrix } from "../../lib/game-utilities/matrix";
import { PlayerRole } from "../enums/player-role.enum";
import { DEFAULT_MATCH_ID } from "../global.variables";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class GameService {
  // add store as dep to this service

  constructor(
    private storage: LocalStorageService,
    private store: Store<AppState>
  ) {}

  public getMatchState() {
    return this.store.pipe(select("game"));
  }

  createMatch() {
    // Set initial Board
    const board = this.setBoard();
    const firstPlayerRole = PlayerRole.Player1;

    // Update localStorage with host player
    this.storage.setPlayerOne();

    // get Match Id from the LocalStorage
    this.storage.setMatchId(DEFAULT_MATCH_ID);
    const id = this.storage.getMatchId();
    const firstPlayer = this.storage.getPlayerOne();

    const startGameState: AppState = {
      matchId: id,
      matchBoard: board,
      playerOne: firstPlayer,
      playerTwo: null,
      activePlayer: firstPlayerRole,
      winnerPlayer: null,
      players: [firstPlayerRole],
      endMatch: false
    };

    // Store update
    this.store.dispatch(fromActions.startMatch({ game: startGameState }));
  }

  matchExists(matchId: string) {
    // Check in store if this matchId exists
  }

  getMatchId(): Observable<string> {
    return this.store.pipe(select(fromGame.getMatchId));
  }

  board$(): Observable<Matrix> {
    return this.store.pipe(select(fromGame.getMatchBoard));
  }

  setBoard(): Matrix {
    return generateMatrixModel(7, 6);
  }

  activePlayer$(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.activePlayerRole));
  }

  setActivePlayer(playerRole: PlayerRole) {
    this.store.dispatch(fromActions.updateActivePlayer({ playerRole }));
  }

  winnerPlayer$(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.winnerPlayerRole));
  }

  endMatch(winnerPlayerRole: PlayerRole) {
    this.store.dispatch(
      fromActions.updateWinnerPlayer({ playerRole: winnerPlayerRole })
    );
    this.store.dispatch(fromActions.endMatch());
  }

  players$(): Observable<PlayerRole[]> {
    return this.store.pipe(select(fromGame.getPlayersArr));
  }

  setPlayerTwo() {
    if (!this.storage.getPlayerTwo()) {
      this.storage.setPlayerTwo();
    }
    const secondPlayer = this.storage.getPlayerTwo();
    this.store.dispatch(fromActions.setPlayerTwo({ playerTwo: secondPlayer }));
    this.store.dispatch(
      fromActions.setSecondPlayerToMatch({ playerRole: secondPlayer.role })
    );
  }
}
