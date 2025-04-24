import {GameResult} from '../shared/model/GameResult';
import {Action, createReducer, on} from '@ngrx/store';
import {isLoading} from './app.actions';

export interface AppState {
  isLoading: boolean;
  gameResult: GameResult;
}

export const initialState: AppState = {
  isLoading: false,
  gameResult: {
    playerMove: null,
    computerMove: null,
    result: null
  }
}

const _appStateReducer = createReducer(
  initialState,
  on(isLoading, (state, {isLoading}) => ({
      ...state,
      isLoading: isLoading
    })
  )
);

export const reducer = (state: AppState = initialState, action: Action): AppState => _appStateReducer(state, action);
