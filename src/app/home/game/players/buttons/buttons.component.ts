import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Player } from "src/app/models/player.model";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"]
})
export class ButtonsComponent implements OnInit {
  @Input() matchId: string = null;
  @Input() playerTwo: Player = null;
  @Input() winnerPlayer: PlayerRole = null;

  @Output() onGameStart = new EventEmitter();
  @Output() onGameJoin = new EventEmitter();
  @Output() onGameEnd = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  gameStart() {
    this.onGameStart.emit();
  }

  gameJoin() {
    this.onGameJoin.emit();
  }

  gameEnd() {
    this.onGameEnd.emit();
  }
}
