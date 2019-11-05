import { Component, OnInit, OnDestroy } from "@angular/core";
import { GameService } from "src/app/shared/services/game.service";
import { Observable, Subject } from "rxjs";
import { Player } from "src/app/models/player.model";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit, OnDestroy {
  public matchId$: Observable<string>;
  public playerOne$: Observable<Player>;
  public playerTwo$: Observable<Player>;
  public activePlayer$: Observable<PlayerRole>;
  public winnerPlayer$: Observable<PlayerRole>;
  public board$: Observable<Matrix>;
  public players$: Observable<PlayerRole[]>;
  public matchId: string = null;
  public onDestroy$ = new Subject();

  constructor(
    private gameService: GameService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.matchId = this.localStorageService.getMatchId();
    this.matchId$ = this.gameService.getMatchId();
    this.matchId = this.localStorageService.getMatchId();
    this.matchId$.pipe(takeUntil(this.onDestroy$)).subscribe(storeMatchId => {
      if (this.matchId != storeMatchId) {
        this.gameService.onRefreshState();
      }
    });
    this.gameService.initState();
    this.playerOne$ = this.gameService.getPlayerOne();
    this.playerTwo$ = this.gameService.getPlayerTwo();
    this.activePlayer$ = this.gameService.getActivePlayerRole();
    this.winnerPlayer$ = this.gameService.getWinnerPlayer();
    this.board$ = this.gameService.getBoard();
    this.players$ = this.gameService.getPlayers();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
