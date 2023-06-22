import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, switchMap } from 'rxjs';
import { Board } from 'src/app/models';
import { BoardService } from 'src/app/services';

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.page.html',
  styleUrls: ['./saved-games.page.scss'],
})
export class SavedGamesPage implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'actions'];

  public dataSource: MatTableDataSource<Board>;

  public error?: string;

  public loading = false;

  public form!: FormGroup<{ filter: FormControl<string | null> }>;

  private sub = new Subscription();

  constructor(private boardService: BoardService) {
    this.dataSource = new MatTableDataSource([] as Board[]);
    this.form = new FormGroup({
      filter: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  retryLoading() {
    this.loadData();
  }

  loadData(filter?: string) {
    this.loading = true;
    this.error = undefined;
    let s = this.boardService.findAll(filter).subscribe({
      next: (boards) => {
        this.dataSource = new MatTableDataSource(boards);
      },
      error: (error) => {
        this.error = error?.error?.message;
      },
      complete: () => {
        this.loading = false;
      },
    });
    this.sub.add(s);
  }

  onUpdate(board: Board) {}

  onDelete(board: Board) {
    if (!board) {
      return;
    }

    let s = this.boardService.remove(board.id).subscribe(() => this.loadData());
    this.sub.add(s);
  }
}
