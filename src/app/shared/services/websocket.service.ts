import { Injectable } from "@angular/core";
import { createClient } from "../../lib/websocketConnector"; // path
import { Observable } from "rxjs";

export interface Chanel {
  send(message: any): void;
  leave(): void;
  downstream: Observable<any>;
}

@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  private chanel: Chanel;

  constructor() {}

  public createWebsocketConnection(meta?: any) {
    const client = createClient("localhost", 4000).connect(meta);
    this.chanel = client.join("ch1");
  }

  public sendMessage(message: any) {
    this.chanel.send(message);
  }

  public getDownstream() {
    return this.chanel.downstream;
  }
}
