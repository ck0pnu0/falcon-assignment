import { Injectable } from "@angular/core";
import { LocalStorageData } from "../../models/localStorage.model";
import { Player } from "../../models/player.model";
import { PlayerRole } from "../enums/player-role.enum";
import { STORAGE_ID, DEFAULT_MATCH_ID } from "../global.variables";

@Injectable()
export class LocalStorageService {
  constructor() {}

  init(): void {
    if (!this.get()) {
      const initialData: LocalStorageData = {
        playerOne: null,
        playerTwo: null,
        matchId: null
      };

      localStorage.setItem(STORAGE_ID, JSON.stringify(initialData));
    }
  }

  private get(): LocalStorageData {
    const data = localStorage.getItem(STORAGE_ID);
    return JSON.parse(data) || null;
  }

  getMatchId(): string {
    const { matchId } = this.get();
    return matchId;
  }

  setMatchId(matchId: string) {
    const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));
    existingData["matchId"] = matchId;
    localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
  }

  getPlayerOne(): Player {
    const { playerOne } = this.get();
    if (playerOne != null) {
      return playerOne;
    }
    return null;
  }

  setPlayerOne() {
    if (!this.getPlayerOne()) {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));
      existingData["playerOne"] = {
        id: this.generateRandomUUID(),
        role: PlayerRole.Player1
      };

      localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
    }
  }

  getPlayerOneId() {
    if (!this.getPlayerOne()) {
      return null;
    }
    return this.getPlayerOne().id;
  }

  getPlayerTwo(): Player {
    const { playerTwo } = this.get();
    return playerTwo;
  }

  setPlayerTwo() {
    if (!this.getPlayerTwo()) {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_ID));

      existingData["playerTwo"] = {
        id: this.generateRandomUUID(),
        role: PlayerRole.Player2
      };

      localStorage.setItem(STORAGE_ID, JSON.stringify(existingData));
    }
  }

  getPlayerTwoId() {
    if (!this.getPlayerTwo()) {
      return null;
    }
    return this.getPlayerTwo().id;
  }

  generateRandomUUID() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }
}
