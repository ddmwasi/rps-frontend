import {createAction, props} from '@ngrx/store';
import {Move} from '../shared/model/move.enum';
import {Result} from '../shared/model/result.enum';

export enum AppActionTypes {
  PlayGame = '[APP] Play Game',
  PlayGameSuccess = '[APP] Play Game Success',
  PlayGameFailure = '[APP] Play Game Failure'
}

export const playGame = createAction(
  AppActionTypes.PlayGame,
  props<{
    playerMove: Move
  }>()
);

export const playGameSuccess = createAction(
  AppActionTypes.PlayGameSuccess,
  props<{
    playerMove: Move,
    computerMove: Move,
    result: Result
  }>()
);

export const playGameFailure = createAction(
  AppActionTypes.PlayGameFailure,
  props<{
    error: boolean
  }>()
);
