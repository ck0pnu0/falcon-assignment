import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { createClient } from "../lib/websocketConnector"; // path

export interface Channel {
  send(message: any): void;
  leave(): void;
  downstream: Observable<any>;
}

@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  private channel: Channel;

  constructor() {}

  // meta example: { name: 'George' }
  public createWebsocketConnection(meta?: any) {
    const client = createClient("localhost", 4000);
    const connection = client.connect(meta);
    this.channel = connection.join("ch1");
  }

  public sendMessage(message: any) {
    this.channel.send(message);
  }

  public getDownstream() {
    return this.channel.downstream.subscribe({
      next: ({ data }) => {
        if (data.error) {
          console.log("# Something went wrong", data.error);
          return;
        }
        if (data.message === "ping") {
          console.log("# Sending pong");
          this.channel.send("pong");
        }
        if (data.message === "pong") {
          console.log("# Received pong", data);
        }
      },
      error: err => console.log("# Something went wrong", err),
      complete: () => console.log("# Complete")
    });
  }
}
