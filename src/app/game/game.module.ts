import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GamePage } from './game.page';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [GamePage],
  imports: [CommonModule, GameRoutingModule, MatDialogModule],
})
export class GameModule {}
