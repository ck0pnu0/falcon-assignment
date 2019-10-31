import { Component, OnInit } from "@angular/core";
import { GameService } from "../../../shared/services/game.service";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit() {}

  onGameStart() {
    this.gameService.createMatch();
  }
}
