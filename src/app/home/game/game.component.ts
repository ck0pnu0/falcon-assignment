import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/shared/services/game.service";
import { Observable } from "rxjs";
import { Player } from "src/app/models/player.model";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  public matchId$: Observable<string>;
  public playerOne$: Observable<Player>;
  public playerTwo$: Observable<Player>;
  public activePlayer$: Observable<PlayerRole>;
  public winnerPlayer$: Observable<PlayerRole>;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getMatchState();
    this.matchId$ = this.gameService.getMatchId();
    this.playerOne$ = this.gameService.getPlayerOne();
    this.playerTwo$ = this.gameService.getPlayerTwo();
    this.activePlayer$ = this.gameService.getActivePlayer();
    this.winnerPlayer$ = this.gameService.getWinnerPlayer();
  }
}
