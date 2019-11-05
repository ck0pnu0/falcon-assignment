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
import { Player } from "src/app/models/player.model";
import { take } from "rxjs/operators";

@Injectable()
export class GameService {
  private _matchId: string;
  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  public initState() {
    this.localStorageService.init();
    return this.store.pipe(select("game"));
  }

  public onRefreshState() {
    // Copy current state from the store in case that LocalStorage has been cleaned
    this.copyStoreStateToLocalStorage();

    const gameState = this.localStorageService.get();
    this.store.dispatch(
      fromActions.setGameStateFromLocalStorage({ game: gameState })
    );
  }

  public createMatch() {
    // Copy current state from the store in case that LocalStorage has been cleaned
    this.copyStoreStateToLocalStorage();
    // Set initial Board
    const board = this.setBoard();

    // Update localStorage with host player
    this.localStorageService.setPlayerOne();

    // get Match Id from the LocalStorage
    this.localStorageService.setMatchId(DEFAULT_MATCH_ID);
    const id = this.localStorageService.getMatchId();
    const firstPlayer = this.localStorageService.getPlayerOne();
    this._matchId = id;

    const startGameState: Partial<AppState> = {
      matchId: id,
      matchBoard: board,
      playerOne: firstPlayer,
      players: [firstPlayer.role]
    };

    // Set first player to the localStorage player in game
    this.localStorageService.setPlayerInGame(firstPlayer);

    // Store update
    this.store.dispatch(fromActions.startMatch({ game: startGameState }));
  }

  public setBoard(): Matrix {
    const initiateBoard = generateMatrixModel(7, 6);
    this.localStorageService.setMatchBoard(initiateBoard);
    return initiateBoard;
  }

  public updateBoard(newBoard: Matrix) {
    // Copy current state from the store in case that LocalStorage has been cleaned
    this.copyStoreStateToLocalStorage();

    this.store.dispatch(fromActions.selectBoardCell({ newBoard }));
    this.localStorageService.setMatchBoard(newBoard);
  }

  public getMatchId(): Observable<string> {
    return this.store.pipe(select(fromGame.getMatchId));
  }

  public setActivePlayer(playerRole: PlayerRole) {
    // Copy current state from the store in case that LocalStorage has been cleaned
    this.copyStoreStateToLocalStorage();

    this.store.dispatch(fromActions.updateActivePlayer({ playerRole }));
    this.localStorageService.setActivePlayer(playerRole);
  }

  public getActivePlayerRole(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.activePlayerRole));
  }

  public setWinnerPlayer(playerRole: PlayerRole) {
    // Copy current state from the store in case that LocalStorage has been cleaned
    this.copyStoreStateToLocalStorage();

    this.store.dispatch(fromActions.updateWinnerPlayer({ playerRole }));
    this.localStorageService.setWinnerPlayer(playerRole);
  }

  public getWinnerPlayer(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.winnerPlayerRole));
  }

  public getPlayerOne(): Observable<Player> {
    return this.store.pipe(select(fromGame.getPlayerOne));
  }

  public setPlayerTwo() {
    // Copy current state from the store in case that LocalStorage has been cleaned
    this.copyStoreStateToLocalStorage();

    if (!this.localStorageService.getPlayerTwo()) {
      this.localStorageService.setPlayerTwo();
    }
    const secondPlayer = this.localStorageService.getPlayerTwo();

    this.store.dispatch(fromActions.setPlayerTwo({ playerTwo: secondPlayer }));
    this.setPlayerTwoToMatch(secondPlayer);
    this.setActivePlayer(PlayerRole.Player1);
  }

  private setPlayerTwoToMatch(player: Player) {
    // Copy current state from the store in case that LocalStorage has been cleaned
    this.copyStoreStateToLocalStorage();

    this.store.dispatch(
      fromActions.setSecondPlayerToMatch({ playerRole: player.role })
    );
    this.localStorageService.setPlayerInGame(player);
  }

  public getPlayerTwo(): Observable<Player> {
    return this.store.pipe(select(fromGame.getPlayerTwo));
  }

  // In case that someone leaves the game
  public leaveMatch(winnerPlayerRole: PlayerRole) {
    // Copy current state from the store in case that LocalStorage has been cleaned
    this.copyStoreStateToLocalStorage();

    this.store.dispatch(
      fromActions.updateWinnerPlayer({ playerRole: winnerPlayerRole })
    );
    this.store.dispatch(fromActions.leaveMatch({ matchEnded: true }));
  }

  public endMatch() {
    // Copy current state from the store in case that LocalStorage has been cleaned
    this.copyStoreStateToLocalStorage();

    this.localStorageService.reset();
    this.store.dispatch(fromActions.endMatch());
  }

  public activePlayer(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.activePlayerRole));
  }

  public getPlayers(): Observable<PlayerRole[]> {
    return this.store.pipe(select(fromGame.getPlayersArr));
  }

  public getBoard(): Observable<Matrix> {
    return this.store.pipe(select(fromGame.getMatchBoard));
  }

  // Copy store state to the localStorage in case of it has been cleared during the game
  private copyStoreStateToLocalStorage() {
    if (!this.localStorageService.get()) {
      this.store
        .pipe(
          select(fromGame.getMatchState),
          take(1)
        )
        .subscribe(matchState => {
          this.localStorageService.setStateFromStore(matchState);
        });
    }
  }
}
