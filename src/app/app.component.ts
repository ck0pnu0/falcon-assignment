import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { WebsocketService } from './websocket.service';
// import { WebsocketService } from "./shared/services/websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "falcon-assignment";
  downstream;

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit() {
    this.webSocketService.createWebsocketConnection();
    this.webSocketService.getDownstream().subscribe(data => console.log(data));
  }
}
