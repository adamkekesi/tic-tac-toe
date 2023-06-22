import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GamePage } from './game.page';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GamePage],
  imports: [CommonModule, GameRoutingModule, MatDialogModule, MatButtonModule],
})
export class GameModule {}
