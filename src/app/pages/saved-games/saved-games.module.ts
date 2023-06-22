import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedGamesRoutingModule } from './saved-games-routing.module';
import { MatTableModule } from '@angular/material/table';
import { SavedGamesPage } from './saved-games.page';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SavedGamesPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SavedGamesRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SavedGamesModule {}
