import { createAction } from 'typesafe-actions';

export const increaseMaxTotalTimeSpentTime = createAction(
  'INCREASE_MAX_TOTAL_TIME_SPENT',
)<number>();
