import { Injectable } from "@angular/core";
import { LocalStorageData } from "src/app/models/localStorage.model";
import { PlayerRole } from "../enums/player-role.enum";

@Injectable()
export class LocalStorageService {
  private readonly STORAGE_ID = "gameChannel";
  constructor() {}

  /**
   * Check whether local storage data has been initialized in the past.
   * If not, store the initial data: player GUID and an empty object
   * to store the role played for each match
   */
  init(): void {
    if (!this.get()) {
      const initialData: LocalStorageData = {
        playerId: this.generateRandomUUID(), // use to generate a uuid
        match: {}
      };

      localStorage.setItem(this.STORAGE_ID, JSON.stringify(initialData));
    }
  }

  private get(): LocalStorageData {
    const data = localStorage.getItem(this.STORAGE_ID);
    return JSON.parse(data) || null;
  }

  setMyRoleForMatch(matchId: string, role: PlayerRole) {
    const data = this.get();
    data.match[matchId] = role;
    localStorage.setItem(this.STORAGE_ID, JSON.stringify(data));
  }

  getMyRoleForMatch(matchId: string): PlayerRole {
    const data = this.get();
    const role = data.match[matchId];
    if (role === null || role === undefined) {
      return null;
    }
    return role;
  }

  getPlayerId(): string {
    const { playerId } = this.get();
    return playerId;
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
