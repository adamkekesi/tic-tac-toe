import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GamePage } from './game.page';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { SaveGameCardComponent } from '../components/save-game-card';

@NgModule({
  declarations: [GamePage],
  imports: [
    CommonModule,
    GameRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    SaveGameCardComponent,
  ],
})
export class GameModule {}
