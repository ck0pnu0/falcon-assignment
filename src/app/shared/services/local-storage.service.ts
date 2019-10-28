import { Injectable } from "@angular/core";
import { LocalStorageData } from "../../models/localStorage.model";
import { Player } from "../../models/player.model";
import { PlayerRole } from "../enums/player-role.enum";

@Injectable()
export class LocalStorageService {
  private readonly STORAGE_ID = "gameChannel";
  constructor() {}

  init(): void {
    if (!this.get()) {
      const initialData: LocalStorageData = {
        playerOne: undefined,
        playerTwo: undefined,
        matchId: undefined
      };

      localStorage.setItem(this.STORAGE_ID, JSON.stringify(initialData));
    }
  }

  private get(): LocalStorageData {
    const data = localStorage.getItem(this.STORAGE_ID);
    return JSON.parse(data) || null;
  }

  getMatchId(): string {
    const { matchId } = this.get();
    return matchId;
  }

  setMatchId(matchId: string) {
    if (!this.getMatchId()) {
      const existingData = localStorage.getItem(this.STORAGE_ID);
      existingData["matchId"] = matchId;
      localStorage.setItem(this.STORAGE_ID, JSON.stringify(existingData));
    }
  }

  getPlayerOne(): Player {
    const { playerOne } = this.get();
    return playerOne;
  }

  setPlayerOne() {
    if (!this.getPlayerOne()) {
      const existingData = localStorage.getItem(this.STORAGE_ID);

      existingData["playerOne"] = {
        id: this.generateRandomUUID(),
        role: PlayerRole.Player1
      };

      localStorage.setItem(this.STORAGE_ID, JSON.stringify(existingData));
    }
  }

  getPlayerTwo(): Player {
    const { playerTwo } = this.get();
    return playerTwo;
  }

  setPlayerTwo() {
    if (!this.getPlayerTwo() && this.getPlayerOne() != null) {
      const existingData = localStorage.getItem(this.STORAGE_ID);

      existingData["playerTwo"] = {
        id: this.generateRandomUUID(),
        role: PlayerRole.Player2
      };

      localStorage.setItem(this.STORAGE_ID, JSON.stringify(existingData));
    }
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
