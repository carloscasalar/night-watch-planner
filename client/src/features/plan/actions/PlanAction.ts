import { asyncFetchPlanActions } from './asyncFetchPlanActions';
import { ActionType } from 'typesafe-actions';

const ActionCreators = {
  asyncFetchPlanActions,
};

export type PlanAction = ActionType<typeof ActionCreators>;
