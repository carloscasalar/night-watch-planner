import { asyncFetchPlanActions } from './asyncFetchPlanActions';
import { ActionType } from 'typesafe-actions';

export const actionCreators = {
  asyncFetchPlanActions,
};

export type PlanAction = ActionType<typeof actionCreators>;
