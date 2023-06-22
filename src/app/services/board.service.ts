import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private baseUrl = environment.apiUrl + '/boards';

  constructor(private http: HttpClient) {}

  create(board: Omit<Board, 'id'>): Observable<Board> {
    return this.http.post<Board>(this.baseUrl, board);
  }

  findAll(): Observable<Board[]> {
    return this.http.get<Board[]>(this.baseUrl);
  }

  findOne(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.baseUrl}/${id}`);
  }

  update(id: number, board: Partial<Board>): Observable<Board> {
    return this.http.patch<Board>(`${this.baseUrl}/${id}`, board);
  }

  remove(id: number): Observable<Board> {
    return this.http.delete<Board>(`${this.baseUrl}/${id}`);
  }
}
