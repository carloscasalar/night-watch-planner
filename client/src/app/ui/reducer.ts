import { createReducer } from 'typesafe-actions';

export interface UiState {
  waitingForPlan: boolean;
}

export const ui = createReducer<UiState>({
  waitingForPlan: false,
});
