import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WebsocketService } from "./services/websocket.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [WebsocketService]
})
export class SharedModule {}
