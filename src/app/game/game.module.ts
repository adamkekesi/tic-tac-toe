import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GamePage } from './game.page';

@NgModule({
  declarations: [GamePage],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
