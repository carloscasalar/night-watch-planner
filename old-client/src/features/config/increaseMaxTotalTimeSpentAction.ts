import { createAction } from 'typesafe-actions';

export const increaseMaxTotalTimeSpentTimeAction = createAction(
  'INCREASE_MAX_TOTAL_TIME_SPENT',
)<number>();
