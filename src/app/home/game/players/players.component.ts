import { Component, OnInit } from "@angular/core";
import { GameService } from "../../../shared/services/game.service";
import { Observable } from "rxjs";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { Player } from "src/app/models/player.model";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit {
  public matchId$: Observable<string>;
  public playerTwo$: Observable<Player>;

  constructor(
    private gameService: GameService // private dispatcher: ReducerManagerDispatcher
  ) {}

  ngOnInit() {
    this.matchId$ = this.gameService.getMatchId();
    this.playerTwo$ = this.gameService.getPlayerTwo();
  }

  onGameStart() {
    this.gameService.createMatch();
  }

  onGameJoin() {
    this.gameService.setPlayerTwo();
  }

  onGameEnd() {
    this.gameService.leaveMatch();
  }
}
