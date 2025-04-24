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

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('AppComponent', () => {

  let mockRPSGameService: any;
  const mockPlayRPSGameResult: GameResult = {
    playerMove: Move.ROCK,
    computerMove: Move.ROCK,
    result: Result.DRAW
  }

  beforeEach(() => {
    mockRPSGameService = {
      playRPSGame: jest.fn().mockReturnValue(of(mockPlayRPSGameResult))
    }

    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, AppComponent],
      providers: [{
        provide: RPSGameService,
        useValue: mockRPSGameService
      },
        provideHttpClient()]
    }).compileComponents();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call the playGame method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.playerMove.set(Move.ROCK);

    component.playGame();

    expect(mockRPSGameService.playRPSGame).toHaveBeenCalled();
  });

  it('should set the result to DRAW when player and computer choose the same move', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    component.selectMove(Move.ROCK);
    component.playGame();

    expect(component.result()).toBe(Result.DRAW);
  });
});
