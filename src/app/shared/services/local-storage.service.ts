import { Injectable } from "@angular/core";
import { LocalStorageData } from "../../models/localStorage.model";
import { Player } from "../../models/player.model";
import { PlayerRole } from "../enums/player-role.enum";
import { STORAGE_ID } from "../global.variables";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { AppState } from "src/app/home/game/store/app.state";

@Injectable()
export class LocalStorageService {
  constructor() {}

  private getGameData(): LocalStorageData {
    const data = localStorage.getItem(STORAGE_ID);
    return JSON.parse(data) || null;
  }

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
    if (!this.getGameData()) {
      const initialData: LocalStorageData = {
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

  // Helper function, same like getGameData with the return type difference only
  public get(): AppState {
    const data = localStorage.getItem(STORAGE_ID);
    return JSON.parse(data) || null;
  }

  public getMatchId(): string {
    const { matchId } = this.getGameData();
    return matchId;
  }

  public setMatchId(matchId: string) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));
    existingData["matchId"] = matchId;
    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public getPlayerOne(): Player {
    const { playerOne } = this.getGameData();
    if (playerOne != null) {
      return playerOne;
    }
    return null;
  }

  public setPlayerOne() {
    if (!this.getPlayerOne()) {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));
      existingData["playerOne"] = {
        id: this.generateRandomUUID(),
        role: PlayerRole.Player1
      };

      localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
    }
  }

  public getPlayerTwo(): Player {
    const { playerTwo } = this.getGameData();
    return playerTwo;
  }

  public setPlayerTwo() {
    if (!this.getPlayerTwo()) {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

      existingData["playerTwo"] = {
        id: this.generateRandomUUID(),
        role: PlayerRole.Player2
      };

      localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
    }
  }

  public setMatchBoard(board: Matrix) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

    existingData["matchBoard"] = board;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public setActivePlayer(activePlayerRole: PlayerRole) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

    existingData["activePlayer"] = activePlayerRole;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public setWinnerPlayer(winnerPlayer: PlayerRole) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

    existingData["winnerPlayer"] = winnerPlayer;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public setPlayerInGame(player: Player) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));
    const players = [...existingData["players"]];
    players.push(player);
    existingData["players"] = players;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public setEndMatch(status: boolean) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

    existingData["endMatch"] = status;

    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  public reset() {
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
