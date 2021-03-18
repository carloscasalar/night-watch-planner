import { createReducer } from 'typesafe-actions';

export interface PlanState {
  waitingForPlan: boolean;
}

export const plan = createReducer<PlanState>({
  waitingForPlan: false,
});
