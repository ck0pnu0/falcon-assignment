import { Injectable } from "@angular/core";
import { Player } from "../../models/player.model";
import { PlayerRole } from "../enums/player-role.enum";
import { STORAGE_ID } from "../global.variables";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { AppState } from "src/app/home/game/store/app.state";

@Injectable()
export class LocalStorageService {
  constructor() {}

  private generateRandomUUID() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }

  public init(): void {
    if (!this.get()) {
      const initialData: AppState = {
        matchId: null,
        matchBoard: [],
        playerOne: null,
        playerTwo: null,
        activePlayer: null,
        winnerPlayer: null,
        players: [],
        endMatch: false
      };

      localStorage.setItem(STORAGE_ID, JSON.stringify(initialData));
    }
  }

  public get(): AppState {
    const data = localStorage.getItem(STORAGE_ID);
    return JSON.parse(data) || null;
  }

  public setStateFromStore(gameState: AppState) {
    const initiateStateFromStore: AppState = {
      matchId: gameState.matchId,
      matchBoard: gameState.matchBoard,
      playerOne: gameState.playerOne,
      playerTwo: gameState.playerTwo,
      activePlayer: gameState.activePlayer,
      winnerPlayer: gameState.winnerPlayer,
      players: [...gameState.players],
      endMatch: gameState.endMatch
    };
    localStorage.setItem(STORAGE_ID, JSON.stringify(initiateStateFromStore));
  }

  public getMatchId(): string {
    if (!this.get()) {
      return;
    }
    const { matchId } = this.get();
    return matchId;
  }

  public setMatchId(matchId: string) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));
    existingData["matchId"] = matchId;
    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public getPlayerOne(): Player {
    if (!this.get()) {
      return;
    }
    const { playerOne } = this.get();
    if (playerOne != null) {
      return playerOne;
    }
    return null;
  }

  public setPlayerOne() {
    if (!this.getPlayerOne() && this.get() != null) {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));
      existingData["playerOne"] = {
        id: this.generateRandomUUID(),
        role: PlayerRole.Player1
      };

      localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
    }
  }

  public getPlayerTwo(): Player {
    if (!this.get()) {
      return;
    }
    const { playerTwo } = this.get();
    return playerTwo;
  }

  public setPlayerTwo() {
    if (!this.getPlayerTwo() && this.get() != null) {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

      existingData["playerTwo"] = {
        id: this.generateRandomUUID(),
        role: PlayerRole.Player2
      };

      localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
    }
  }

  public setMatchBoard(board: Matrix) {
    if (!this.get()) {
      return;
    }
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

    existingData["matchBoard"] = board;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public setActivePlayer(activePlayerRole: PlayerRole) {
    if (!this.get()) {
      return;
    }
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

    existingData["activePlayer"] = activePlayerRole;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public setWinnerPlayer(winnerPlayer: PlayerRole) {
    if (!this.get()) {
      return;
    }
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

    existingData["winnerPlayer"] = winnerPlayer;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public setPlayerInGame(player: Player) {
    if (!this.get()) {
      return;
    }
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));
    const players = [...existingData["players"]];
    players.push(player.role);
    existingData["players"] = players;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public setEndMatch(status: boolean) {
    if (!this.get()) {
      return;
    }
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

    existingData["endMatch"] = status;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public reset() {
    if (!this.get()) {
      return;
    }
    const resetExistingData = JSON.parse(localStorage.getItem(STORAGE_ID));
    resetExistingData["matchId"] = null;
    resetExistingData["playerOne"] = null;
    resetExistingData["playerTwo"] = null;
    resetExistingData["matchBoard"] = [];
    resetExistingData["activePlayer"] = null;
    resetExistingData["winnerPlayer"] = null;
    resetExistingData["players"] = [];
    resetExistingData["endMatch"] = false;
    localStorage.setItem(STORAGE_ID, JSON.stringify(resetExistingData));
  }
}
