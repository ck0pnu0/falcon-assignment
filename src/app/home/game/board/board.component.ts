import { Component, Input, OnInit } from "@angular/core";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { PlayerRole } from "src/app/shared/enums/player-role.enum";
import { GameService } from "src/app/shared/services/game.service";
import { getWinnerValue } from "../game.utils";
// import { checkFour, WinningMove } from "src/app/lib/game-utilities/check-four";
// import { Subject } from "rxjs";
// import { takeUntil } from "rxjs/operators";
// import { BoardCell } from "./board-cell";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  @Input() activePlayer: PlayerRole;
  @Input() winnerPlayer: PlayerRole;
  @Input() board: Matrix = [];
  @Input() players: PlayerRole[] = [];
  inGamePlayers = 2;
  playerOneRole = PlayerRole.Player1;
  playerTwoRole = PlayerRole.Player2;
  playerRoleWinningTheGame;
  // onDestroy$ = new Subject();
  // selectedCell: BoardCell;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  onClickCell(col: number) {
    // Update matrix state - col/row (selectedCell) and current active user
    for (let i = this.board[col].length; i >= 0; i--) {
      if (this.board[col][i] == 0) {
        this.board[col][i] = this.activePlayer;
        // This was used for provided winning logic which I don't use anymore
        // Left it here just in case you would like to check it
        // this.selectedCell = { col, row: i };
        break;
      }
    }
    // Update board
    this.gameService.updateBoard(this.board);

    // I've tried using your winning logic and it didn't work for me
    // Below is my implementation
    // const checkCell = [this.selectedCell.col, this.selectedCell.row];
    // const isWinningTheGame = checkFour(
    //   this.activePlayer.toString(),
    //   this.board,
    //   checkCell
    // );
    // console.log(isWinningTheGame instanceof WinningMove);

    // check if active player winning the game
    this.playerRoleWinningTheGame = getWinnerValue(this.board);
    if (this.playerRoleWinningTheGame != null) {
      // if true -> end game and set winner
      this.gameService.setWinnerPlayer(this.playerRoleWinningTheGame);
      // set winning cells
      // alert("Game over, player" + this.playerRoleWinningTheGame + "Wins!");
    } else {
      // Change active player
      if (this.activePlayer === this.playerOneRole) {
        this.gameService.setActivePlayer(this.playerTwoRole);
      } else {
        this.gameService.setActivePlayer(this.playerOneRole);
      }
    }
  }
}
