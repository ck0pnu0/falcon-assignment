import { Component, OnInit } from "@angular/core";
import { GameService } from "../shared/services/game.service";
import { LocalStorageService } from "../shared/services/local-storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.localStorageService.init();
    this.gameService.getMatchState();
  }
}
