import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RPSGameService} from './shared/services/rps-game.service';
import {of} from 'rxjs';
import {GameResult} from './shared/model/GameResult';
import {Move} from './shared/model/move.enum';
import {Result} from './shared/model/result.enum';
import {provideHttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import "zone.js"
import {provideStore} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {playGame} from "./store/app.actions";
import {appSelectors} from './store/app.selector';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('AppComponent', () => {

  let mockRPSGameService: any;
  let mockStore: MockStore;
  const mockPlayRPSGameResult: GameResult = {
    playerMove: Move.ROCK,
    computerMove: Move.ROCK,
    result: Result.DRAW
  };

  beforeEach(() => {
    mockRPSGameService = {
      playRPSGame: jest.fn().mockReturnValue(of(mockPlayRPSGameResult))
    };

    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, AppComponent],
      providers: [
        {provide: RPSGameService, useValue: mockRPSGameService},
        provideStore(),
        provideHttpClient(),
        provideMockStore({
          selectors: [
            {selector: appSelectors.gameResult, value: mockPlayRPSGameResult},
            {selector: appSelectors.isLoading, value: false},
            {selector: appSelectors.isError, value: false}
          ]
        })
      ]
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should dispatch the playGame action', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

    component.playerMove.set(Move.ROCK);
    component.playGame();

    expect(dispatchSpy).toHaveBeenCalledWith(playGame({playerMove: Move.ROCK}));
  });

  it('should set the result to DRAW when player and computer choose the same move', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.selectMove(Move.ROCK);
    component.playGame();

    mockStore.select(appSelectors.gameResult).subscribe(gameResult => {
      expect(gameResult.result).toBe(Result.DRAW);
    });
  });
});
