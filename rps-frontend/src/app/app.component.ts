import "@angular/compiler";
import {CommonModule} from '@angular/common';
import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {env} from '../environments/environment';
import {RPSGameService} from './shared/services/rps-game.service';
import {Move} from './shared/model/move.enum';
import {Result} from './shared/model/result.enum';
import {Store} from '@ngrx/store';
import {isLoading} from "./store/app.actions";
import {appSelectors} from './store/app.selector';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {

  form: FormGroup;
  playerMove = signal<Move | null>(null);
  computerMove = signal<Move | null>(null);
  result = signal<Result | null>(null);
  error = false;
  isLoading = false;
  isDisabled = true;

  moves = [
    {label: 'Paper', icon: 'bi-file-earmark-text-fill', color: 'primary', chosenMove: Move.PAPER},
    {label: 'Rock', icon: 'bi-gem', color: 'success', chosenMove: Move.ROCK},
    {label: 'Scissors', icon: 'bi-scissors', color: 'danger', chosenMove: Move.SCISSORS}
  ];

  constructor(private rpsGameService: RPSGameService, private store: Store) {
    this.form = new FormGroup({
      move: new FormControl<Move | null>(null)
    })

    this.form.get('move')?.valueChanges.subscribe(selectedMove => {
      if (selectedMove) {
        this.error = false;
        this.playerMove.set(selectedMove);
        this.computerMove.set(null);
        this.result.set(null);
      }
    });

    this.store.select(appSelectors.isLoading).subscribe(isLoading => {
      this.isLoading = isLoading;
    })

    this.error = false;
  }

  selectMove(move: Move): void {
    this.isDisabled = false;
    this.form.get('move')?.setValue(move);
  }

  isSelected(move: Move): boolean {
    return this.playerMove() === move;
  }

  getButtonClasses(move: Move, color: string): { [key: string]: boolean } {
    return {
      'active': this.isSelected(move),
      [`btn-${color}`]: this.isSelected(move),
      [`btn-outline-${color}`]: !this.isSelected(move)
    };
  }

  playGame(): void {
    if (env.useMockBackend) {
      const choices = [Move.ROCK, Move.PAPER, Move.SCISSORS];
      const player = this.playerMove();
      const computer = choices[Math.floor(Math.random() * choices.length)];
      this.computerMove.set(computer);

      if (!player)
        return;

      if (player === computer) {
        this.result.set(Result.DRAW);
      } else if (
        (player === Move.PAPER && computer === Move.ROCK) ||
        (player === Move.ROCK && computer === Move.SCISSORS) ||
        (player === Move.SCISSORS && computer === Move.PAPER)
      ) {
        this.result.set(Result.PLAYER_WINS);
      } else {
        this.result.set(Result.COMPUTER_WINS);
      }
    } else {
      this.error = false;
      const playerMove = this.playerMove();
      if (playerMove !== null) {
        this.store.dispatch(isLoading({isLoading: true}));
        this.rpsGameService.playRPSGame(playerMove).subscribe({
            next: response => {
              this.error = false;
              this.store.dispatch(isLoading({isLoading: false}));
              this.computerMove.set(response.computerMove);
              this.result.set(response.result);
            },
          error: () => {
              this.error = true;
            this.store.dispatch(isLoading({isLoading: false}));
            }
          }
        )
      }
    }
  }
}
