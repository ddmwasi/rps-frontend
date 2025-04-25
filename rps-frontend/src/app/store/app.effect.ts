import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject, Injectable} from '@angular/core';
import {playGame, playGameFailure, playGameSuccess} from './app.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {RPSGameService} from '../shared/services/rps-game.service';

@Injectable()
export class AppEffects {

  private readonly actions$ = inject(Actions);
  private readonly rpsGameService = inject(RPSGameService);

  readonly playGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playGame),
      switchMap(action => {
        return this.rpsGameService.playRPSGame(action.playerMove).pipe(
          map(gameResult => {
            return playGameSuccess({
              playerMove: gameResult.playerMove!,
              computerMove: gameResult.computerMove!,
              result: gameResult.result!
            });
          }),
          catchError(error => {
            console.error('Error:', error);
            return of(playGameFailure({error: true}));
          })
        );
      }),
    )
  );

}
