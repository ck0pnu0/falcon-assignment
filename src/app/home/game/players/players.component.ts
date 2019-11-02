import { Component, OnInit, Input } from "@angular/core";
import { GameService } from "../../../shared/services/game.service";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { Player } from "src/app/models/player.model";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit {
  public playerOneRole = PlayerRole.Player1;
  public playerTwoRole = PlayerRole.Player2;

  @Input() matchId: string = null;
  @Input() playerOne: Player = null;
  @Input() playerTwo: Player = null;
  @Input() activePlayer: PlayerRole = null;
  @Input() winnerPlayer: PlayerRole = null;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

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
