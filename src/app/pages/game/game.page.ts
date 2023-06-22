import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardStatus, createBoardEditorForm, evaluateBoard } from '../../utils';
import { MatDialog } from '@angular/material/dialog';
import {
  GameOverModalComponent,
  GameOverModalData,
} from '../../components/game-over-modal';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '../../services';
import { Board } from '../../models';
import { ActivatedRoute } from '@angular/router';

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

  public saveGameForm!: FormGroup<{ name: FormControl<string | null> }>;

  public error?: string;

  public loading = false;

  public boardEmpty = true;

  private subscriptions: Subscription[] = [];

  private savedBoard?: Board;

  constructor(
    private dialog: MatDialog,
    private boardService: BoardService,
    private route: ActivatedRoute
  ) {
    this.saveGameForm = createBoardEditorForm();
    route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.boardService.findAll().subscribe((boards) => {
        const board = boards.find((b) => b.id === +id);
        if (board) {
          this.board = board.board.split('').map((c) => parseInt(c));
          this.boardEmpty = false;
          this.savedBoard = board;
          this.saveGameForm.setValue({ name: board.name });
        }
      });
    });
  }

  ngOnInit(): void {
    this.board = this.generateBoard();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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

    this.boardEmpty = false;
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

    let sub = dialogRef.afterClosed().subscribe((startNewGame: boolean) => {
      if (startNewGame) {
        this.reset();
      }
    });

    this.subscriptions.push(sub);

    this.gameState = GameState.Ended;
  }

  reset() {
    this.board = this.generateBoard();
    this.boardEmpty = true;
    this.player = 1;
    this.gameState = GameState.InProgress;
    this.saveGameForm.reset();
  }

  saveGame() {
    this.error = undefined;
    this.loading = true;

    const observer = {
      next: (board: Board) => {
        this.savedBoard = board;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Unexpected error';
      },
      complete: () => {
        this.loading = false;
      },
    };

    const payload = {
      name: this.saveGameForm.value.name!,
      board: this.board.join(''),
    };

    let sub: Subscription;

    if (this.savedBoard) {
      sub = this.boardService
        .update(this.savedBoard.id, payload)
        .subscribe(observer);
    } else {
      sub = this.boardService.create(payload).subscribe(observer);
    }

    this.subscriptions.push(sub);
  }
}
