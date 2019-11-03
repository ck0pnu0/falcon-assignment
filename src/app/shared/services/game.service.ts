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

@Injectable()
export class GameService {
  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  public initState() {
    this.localStorageService.init();
    return this.store.pipe(select("game"));
  }

  public onRefreshState() {
    const gameState = this.localStorageService.get();
    this.store.dispatch(
      fromActions.setGameStateFromLocalStorage({ game: gameState })
    );
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

    const startGameState: Partial<AppState> = {
      matchId: id,
      matchBoard: board,
      playerOne: firstPlayer,
      players: [firstPlayerRole]
    };

    // Set first player to the localStorage player in game
    this.localStorageService.setPlayerInGame(firstPlayer);

    // Store update
    this.store.dispatch(fromActions.startMatch({ game: startGameState }));
  }

  setBoard(): Matrix {
    const initiateBoard = generateMatrixModel(7, 6);
    this.localStorageService.setMatchBoard(initiateBoard);
    return initiateBoard;
  }

  updateBoard(newBoard: Matrix) {
    this.store.dispatch(fromActions.selectBoardCell({ newBoard }));
    this.localStorageService.setMatchBoard(newBoard);
  }

  getMatchId(): Observable<string> {
    return this.store.pipe(select(fromGame.getMatchId));
  }

  setActivePlayer(playerRole: PlayerRole) {
    this.store.dispatch(fromActions.updateActivePlayer({ playerRole }));
    this.localStorageService.setActivePlayer(playerRole);
  }

  getActivePlayerRole(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.activePlayerRole));
  }

  setWinnerPlayer(playerRole: PlayerRole) {
    this.store.dispatch(fromActions.updateWinnerPlayer({ playerRole }));
    this.localStorageService.setWinnerPlayer(playerRole);
  }

  getWinnerPlayer(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.winnerPlayerRole));
  }

  getPlayerOne(): Observable<Player> {
    return this.store.pipe(select(fromGame.getPlayerOne));
  }

  setPlayerTwo() {
    if (!this.localStorageService.getPlayerTwo()) {
      this.localStorageService.setPlayerTwo();
    }
    const secondPlayer = this.localStorageService.getPlayerTwo();

    this.store.dispatch(fromActions.setPlayerTwo({ playerTwo: secondPlayer }));
    this.setPlayerTwoToMatch(secondPlayer);
    this.setActivePlayer(PlayerRole.Player1);
  }

  setPlayerTwoToMatch(player: Player) {
    this.store.dispatch(
      fromActions.setSecondPlayerToMatch({ playerRole: player.role })
    );
    this.localStorageService.setPlayerInGame(player);
  }

  getPlayerTwo(): Observable<Player> {
    return this.store.pipe(select(fromGame.getPlayerTwo));
  }

  endMatch(winnerPlayerRole: PlayerRole) {
    this.store.dispatch(
      fromActions.updateWinnerPlayer({ playerRole: winnerPlayerRole })
    );
    this.store.dispatch(fromActions.endMatch({ matchEnded: true }));
  }

  leaveMatch() {
    this.localStorageService.reset();
    this.store.dispatch(fromActions.leaveMatch());
  }

  activePlayer(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.activePlayerRole));
  }

  getPlayers(): Observable<PlayerRole[]> {
    return this.store.pipe(select(fromGame.getPlayersArr));
  }

  getBoard(): Observable<Matrix> {
    return this.store.pipe(select(fromGame.getMatchBoard));
  }
}
