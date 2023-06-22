import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Board } from 'src/app/models';
import { BoardService } from 'src/app/services';
import { createBoardEditorForm } from 'src/app/utils';

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

  public updatedId = -1;

  public updateForm!: FormGroup<{ name: FormControl<string | null> }>;

  private sub = new Subscription();

  constructor(private boardService: BoardService, private router: Router) {
    this.dataSource = new MatTableDataSource([] as Board[]);
    this.form = new FormGroup({
      filter: new FormControl(''),
    });
    this.updateForm = createBoardEditorForm();
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

  onUpdate(board: Board) {
    this.updateForm.reset();
    this.updateForm.setValue({ name: board.name });
    this.updatedId = board.id;
  }

  onDelete(board: Board) {
    if (!board) {
      return;
    }

    let s = this.boardService.remove(board.id).subscribe(() => this.loadData());
    this.sub.add(s);
  }

  saveUpdate() {
    if (!this.updateForm.valid) {
      return;
    }

    let s = this.boardService
      .update(this.updatedId, {
        name: this.updateForm.value.name || '',
        board:
          this.dataSource.data.find((b) => b.id === this.updatedId)?.board ||
          '',
      })
      .subscribe(() => {
        this.loadData();
        this.updatedId = -1;
      });
    this.sub.add(s);
  }

  open(board: Board) {
    this.router.navigate(['/'], { queryParams: { id: board.id } });
  }
}
