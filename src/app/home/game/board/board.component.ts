import { Component, OnInit, Input } from "@angular/core";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { GameService } from "src/app/shared/services/game.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  @Input() activePlayer: PlayerRole;
  @Input() board: Matrix = [];
  @Input() players: PlayerRole[] = [];
  inGamePlayers = 2;
  playerOneRole = PlayerRole.Player1;
  playerTwoRole = PlayerRole.Player2;
  isWinner;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  onClickCell(col: number) {
    // Update matrix state - col/row (selectedCell) and current active user
    for (let i = this.board[col].length; i > 0; i--) {
      if (this.board[col][i] == 0) {
        this.board[col][i] = this.activePlayer;
        break;
      }
    }
    // check if active player winning the game
    // if true -> end game and set winner
    // set winning cells
    // else
    // Update board
    this.gameService.updateBoard(this.board);

    // Change active player
    if (this.activePlayer == this.playerOneRole) {
      this.gameService.setActivePlayer(this.playerTwoRole);
    } else {
      this.gameService.setActivePlayer(this.playerOneRole);
    }
  }
}
