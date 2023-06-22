import { Component, OnInit } from '@angular/core';
import { BoardStatus, evaluateBoard } from '../utils';
import { MatDialog } from '@angular/material/dialog';
import {
  GameOverModalComponent,
  GameOverModalData,
} from '../components/game-over-modal';

@Component({
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public size = 3;

  public board: number[] = [];

  public player = 1;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.board = this.generateBoard();
  }

  generateBoard(): number[] {
    let board: number[] = [];
    for (let i = 0; i < this.size * this.size; i++) {
      board.push(0);
    }

    return board;
  }

  play(i: number) {
    if (this.board[i] !== 0) {
      return;
    }

    this.board[i] = this.player;
    this.player = this.player === 1 ? 2 : 1;

    const result = evaluateBoard(this.board);
    if (result !== BoardStatus.InProgress) {
      this.dialog.open(GameOverModalComponent, {
        data: { result } as GameOverModalData,
        disableClose: true,
      });
    }
  }
}
