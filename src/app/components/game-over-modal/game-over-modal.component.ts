import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BoardStatus } from 'src/app/utils';

export interface GameOverModalData {
  result: BoardStatus;
}

@Component({
  selector: 'app-game-over-modal',
  templateUrl: './game-over-modal.component.html',
  styleUrls: ['./game-over-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule],
})
export class GameOverModalComponent {
  constructor(
    public dialogRef: MatDialogRef<GameOverModalComponent>,

    @Inject(MAT_DIALOG_DATA) public data: GameOverModalData
  ) {}
}
