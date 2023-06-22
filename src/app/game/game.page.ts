import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public size = 3;

  public board: number[] = [];

  public player = 1;

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
  }
}
