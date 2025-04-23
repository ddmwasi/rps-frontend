import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RPSGameService} from './rps-game.service';
import {env} from '../environments/environment';
import {GameResult} from '../model/GameResult';
import {Move} from '../model/move.enum';
import {Result} from '../model/result.enum';

describe('RPSGameService', () => {
  let service: RPSGameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RPSGameService]
    });
    service = TestBed.inject(RPSGameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call playRPSGame and return GameResult', () => {
    const mockResult: GameResult = {
      playerMove: Move.PAPER,
      computerMove: Move.SCISSORS,
      result: Result.COMPUTER_WINS
    };

    service.playRPSGame(Move.PAPER).subscribe(result => {
      expect(result).toEqual(mockResult);
    });

    const req = httpMock.expectOne(env.backendURL);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Basic ' + btoa(`${env.username}:${env.password}`));
    req.flush(mockResult);
  });

  it('should handle error', () => {
    const errorMessage = 'An error occurred!';

    service.playRPSGame('').subscribe({
      next: () => fail('Expected an error, not GameResult'),
      error: error => {
        expect(error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(env.backendURL);
    req.flush('Something went wrong', {status: 500, statusText: 'Server Error'});
  });
});
