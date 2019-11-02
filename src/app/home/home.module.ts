import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { GameComponent } from "./game/game.component";
import { PlayersComponent } from "./game/players/players.component";
import { BoardComponent } from "./game/board/board.component";
import { GameService } from "../shared/services/game.service";
import { LocalStorageService } from "../shared/services/local-storage.service";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./game/store/app.reducer";

@NgModule({
  declarations: [
    HomeComponent,
    GameComponent,
    PlayersComponent,
    BoardComponent
  ],
  imports: [CommonModule, StoreModule.forFeature("game", reducer)],
  providers: [GameService, LocalStorageService]
})
export class HomeModule {}
