import { Component, OnInit } from "@angular/core";
import { GameService } from "../../../shared/services/game.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit {
  public matchId$: Observable<string>;
  public isMatchExists: boolean;

  constructor(
    private gameService: GameService // private dispatcher: ReducerManagerDispatcher
  ) {}

  ngOnInit() {
    this.matchId$ = this.gameService.getMatchId();
  }

  onGameStart() {
    this.gameService.createMatch();
  }
}
