import {HttpClient, HttpHeaders} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {env} from '../../../environments/environment';
import {GameResult} from '../model/GameResult';

@Injectable({
  providedIn: 'root'
})
export class RPSGameService {
  private http = inject(HttpClient);

  playRPSGame(playerMove: string): Observable<GameResult> {
    const url = env.backendURL;
    const payload = {playerMove: playerMove};
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${env.username}:${env.password}`)
    });

    return this.http.post<any>(url, payload, {headers}).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('An error occurred!'));
      })
    );
  }
}
