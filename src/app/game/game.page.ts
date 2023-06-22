import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardStatus, evaluateBoard } from '../utils';
import { MatDialog } from '@angular/material/dialog';
import {
  GameOverModalComponent,
  GameOverModalData,
} from '../components/game-over-modal';
import { Subscription } from 'rxjs';

enum GameState {
  InProgress,
  Ended,
}

@Component({
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, OnDestroy {
  public size = 3;

  public board: number[] = [];

  public player = 1;

  public gameState = GameState.InProgress;

  private subscription?: Subscription;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.board = this.generateBoard();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  generateBoard(): number[] {
    let board: number[] = [];
    for (let i = 0; i < this.size * this.size; i++) {
      board.push(0);
    }

    return board;
  }

  play(i: number) {
    if (this.board[i] !== 0 || this.gameState === GameState.Ended) {
      return;
    }

    this.board[i] = this.player;
    this.player = this.player === 1 ? 2 : 1;

    const result = evaluateBoard(this.board);

    if (result !== BoardStatus.InProgress) {
      this.onGameEnded(result);
    }
  }

  onGameEnded(gameResult: BoardStatus) {
    const dialogRef = this.dialog.open(GameOverModalComponent, {
      data: { result: gameResult } as GameOverModalData,
      disableClose: true,
    });

    this.subscription = dialogRef
      .afterClosed()
      .subscribe((startNewGame: boolean) => {
        console.log(startNewGame);
        if (startNewGame) {
          this.reset();
        }
      });

    this.gameState = GameState.Ended;
  }

  reset() {
    this.board = this.generateBoard();
    this.player = 1;
    this.gameState = GameState.InProgress;
  }
}
