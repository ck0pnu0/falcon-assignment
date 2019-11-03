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
  private matchId: string;

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {}

  public initState() {
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

    const startGameState: Partial<AppState> = {
      matchId: id,
      matchBoard: board,
      playerOne: firstPlayer,
      players: [firstPlayerRole]
    };

    // Store update
    this.store.dispatch(fromActions.startMatch({ game: startGameState }));
  }

  setBoard(): Matrix {
    return generateMatrixModel(7, 6);
  }

  updateBoard(newBoard: Matrix) {
    this.store.dispatch(fromActions.selectBoardCell({ newBoard }));
  }

  getMatchId(): Observable<string> {
    return this.store.pipe(select(fromGame.getMatchId));
  }

  setActivePlayer(playerRole: PlayerRole) {
    this.store.dispatch(fromActions.updateActivePlayer({ playerRole }));
  }

  getActivePlayerRole(): Observable<PlayerRole> {
    return this.store.pipe(select(fromGame.activePlayerRole));
  }

  getActivePlayer(playerRole: PlayerRole) {
    if (playerRole === PlayerRole.Player1) {
      return this.store.pipe(select(fromGame.getPlayerOne));
    } else {
      return this.store.pipe(select(fromGame.getPlayerTwo));
    }
  }

  setWinnerPlayer(playerRole: PlayerRole) {
    this.store.dispatch(fromActions.updateWinnerPlayer({ playerRole }));
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
    this.store.dispatch(fromActions.leaveMatch());
    this.localStorageService.reset();
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
