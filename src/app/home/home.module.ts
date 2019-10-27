import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { GameComponent } from './game/game.component';
import { PlayersComponent } from './game/players/players.component';
import { BoardComponent } from './game/board/board.component';



@NgModule({
  declarations: [HomeComponent, GameComponent, PlayersComponent, BoardComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
