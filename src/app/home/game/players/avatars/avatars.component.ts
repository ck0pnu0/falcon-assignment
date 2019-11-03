import { Component, Input, OnInit } from "@angular/core";
import { Player } from "src/app/models/player.model";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";

@Component({
  selector: "app-avatars",
  templateUrl: "./avatars.component.html",
  styleUrls: ["./avatars.component.scss"]
})
export class AvatarsComponent implements OnInit {
  public playerOneRole = PlayerRole.Player1;
  public playerTwoRole = PlayerRole.Player2;
  @Input() matchId: string = null;
  @Input() activePlayer: PlayerRole = null;
  @Input() winnerPlayer: PlayerRole = null;
  @Input() playerOne: Player = null;
  @Input() playerTwo: Player = null;

  constructor() {}

  ngOnInit() {}
}
