import {createAction, props} from '@ngrx/store';

export enum AppActionTypes {
  IsLoading = '[APP] Is Loading'
}

export const isLoading = createAction(
  AppActionTypes.IsLoading,
  props<{
    isLoading: boolean
  }>()
);
