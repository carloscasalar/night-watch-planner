import { createReducer } from 'typesafe-actions';

const TWELVE_HOURS_IN_MINUTES = 12 * 60;

export interface PlanState {
  isLoading: boolean;
  maxTotalTimeSpent: number;
}

export const plan = createReducer<PlanState>({
  isLoading: false,
  maxTotalTimeSpent: TWELVE_HOURS_IN_MINUTES,
});
