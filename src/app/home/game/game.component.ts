import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/shared/services/game.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getMatchState();
  }
}
