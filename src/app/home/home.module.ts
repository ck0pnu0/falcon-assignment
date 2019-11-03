import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { GameService } from "../shared/services/game.service";
import { LocalStorageService } from "../shared/services/local-storage.service";
import { BoardComponent } from "./game/board/board.component";
import { GameComponent } from "./game/game.component";
import { PlayersComponent } from "./game/players/players.component";
import { reducer } from "./game/store/app.reducer";
import { APP_KEY } from "./game/store/app.selectors";
import { HomeComponent } from "./home.component";
import { ButtonsComponent } from "./game/players/buttons/buttons.component";
import { AvatarsComponent } from "./game/players/avatars/avatars.component";

@NgModule({
  declarations: [
    HomeComponent,
    GameComponent,
    PlayersComponent,
    BoardComponent,
    ButtonsComponent,
    AvatarsComponent
  ],
  imports: [CommonModule, StoreModule.forFeature(APP_KEY, reducer)],
  providers: [GameService, LocalStorageService]
})
export class HomeModule {}
