import {GameResult} from '../shared/model/GameResult';
import {Action, createReducer, on} from '@ngrx/store';
import {playGame, playGameFailure, playGameSuccess} from './app.actions';

export interface AppState {
  isLoading: boolean;
  gameResult: GameResult | null;
  isError: boolean;
}

export const initialState: AppState = {
  isLoading: false,
  gameResult: null,
  isError: false
}

const _appStateReducer = createReducer(
  initialState,
  on(playGame, (state) => ({
      ...state,
      isLoading: true
    })
  ),
  on(playGameSuccess, (state, {playerMove, computerMove, result}) => ({
      ...state,
      gameResult: {
        playerMove: playerMove,
        computerMove: computerMove,
        result: result
      },
      isLoading: false,
      isError: false
    })
  ),
  on(playGameFailure, (state, {error}) => ({
      ...state,
    isLoading: false,
    isError: error
    })
  )
);

export const reducer = (state: AppState = initialState, action: Action): AppState => _appStateReducer(state, action);
