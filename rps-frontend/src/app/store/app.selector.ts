import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.reducer';

// Lookup the 'App' feature state managed by NgRx
const getAppState = createFeatureSelector<AppState>('app');
const isLoading = createSelector(getAppState, (state: AppState) => state.isLoading);
const isError = createSelector(getAppState, (state: AppState) => state.isError);
const gameResult = createSelector(getAppState, (state: AppState) => state.gameResult);

export const appSelectors = {
  isLoading,
  isError,
  gameResult
}
