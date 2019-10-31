import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, BehaviorSubject } from "rxjs";
import { AppState } from "src/app/home/game/store/app.state";
import * as fromActions from "../../home/game/store/app.actions";
import * as fromGame from "../../home/game/store/app.selectors";
import { generateMatrixModel, Matrix } from "../../lib/game-utilities/matrix";
import { PlayerRole } from "../enums/player-role.enum";
import { DEFAULT_MATCH_ID } from "../global.variables";
import { LocalStorageService } from "./local-storage.service";
import { map } from "rxjs/operators";

@Injectable()
export class GameService {
  private matchId: string;

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  public getMatchState() {
    this.localStorageService.init();
    return this.store.pipe(select("game"));
  }

  createMatch() {
    // Set initial Board
    const board = this.setBoard();
    const firstPlayerRole = PlayerRole.Player1;

    // Update localStorage with host player
    this.localStorageService.setPlayerOne();

    // get Match Id from the LocalStorage
    this.localStorageService.setMatchId(DEFAULT_MATCH_ID);
    const id = this.localStorageService.getMatchId();
    const firstPlayer = this.localStorageService.getPlayerOne();

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

  setBoard(): Matrix {
    return generateMatrixModel(7, 6);
  }

  getMatchId(): Observable<string> {
    return this.store.pipe(
      select(fromGame.getMatchId)
      // map(id => (this.matchId = id))
    );
  }

  isMatchExists(): boolean {
    if (this.matchId != null) {
      return true;
    }
    return false;
  }

  setActivePlayer(playerRole: PlayerRole) {
    this.store.dispatch(fromActions.updateActivePlayer({ playerRole }));
  }

  winnerPlayer$(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.winnerPlayerRole));
  }

  setPlayerTwo() {
    if (!this.localStorageService.getPlayerTwo()) {
      this.localStorageService.setPlayerTwo();
    }
    const secondPlayer = this.localStorageService.getPlayerTwo();
    this.store.dispatch(fromActions.setPlayerTwo({ playerTwo: secondPlayer }));
    this.store.dispatch(
      fromActions.setSecondPlayerToMatch({ playerRole: secondPlayer.role })
    );
  }

  endMatch(winnerPlayerRole: PlayerRole) {
    this.store.dispatch(
      fromActions.updateWinnerPlayer({ playerRole: winnerPlayerRole })
    );
    this.store.dispatch(fromActions.endMatch());
  }

  activePlayer$(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.activePlayerRole));
  }

  players$(): Observable<PlayerRole[]> {
    return this.store.pipe(select(fromGame.getPlayersArr));
  }

  board$(): Observable<Matrix> {
    return this.store.pipe(select(fromGame.getMatchBoard));
  }
}
