import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable, of, throwError} from 'rxjs';
import {RPSGameService} from '../shared/services/rps-game.service';
import {playGame, playGameFailure, playGameSuccess} from './app.actions';
import {Move} from '../shared/model/move.enum';
import {GameResult} from '../shared/model/GameResult';
import {Result} from '../shared/model/result.enum';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {AppEffects} from './app.effect';
import 'zone.js';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;
  let rpsGameService: any;

  const mockGameResult: GameResult = {
    playerMove: Move.ROCK,
    computerMove: Move.PAPER,
    result: Result.COMPUTER_WINS
  };

  beforeEach(() => {
    const mockRPSGameService = {
      playRPSGame: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {provide: RPSGameService, useValue: mockRPSGameService}
      ]
    });

    effects = TestBed.inject(AppEffects);
    rpsGameService = TestBed.inject(RPSGameService);
  });

  it('should return playGameSuccess action on success', () => {
    const action = playGame({playerMove: Move.ROCK});
    const completion = playGameSuccess({
      playerMove: Move.ROCK,
      computerMove: Move.PAPER,
      result: Result.COMPUTER_WINS
    });

    actions$ = of(action);
    rpsGameService.playRPSGame.mockReturnValue(of(mockGameResult));

    effects.playGame$.subscribe((result: any) => {
      expect(result).toEqual(completion);
    });
  });

  it('should return playGameFailure action on error', () => {
    const action = playGame({playerMove: Move.ROCK});
    const completion = playGameFailure({error: true});

    actions$ = of(action);
    rpsGameService.playRPSGame.mockReturnValue(throwError(() => new Error('error')));

    effects.playGame$.subscribe((result: any) => {
      expect(result).toEqual(completion);
    });
  });
});
