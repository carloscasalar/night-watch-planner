import { createReducer } from 'typesafe-actions';

const TWELVE_HOURS_IN_MINUTES = 12 * 60;

export interface NightWatchConfigState {
  maxTotalTimeSpent: number;
}

export const config = createReducer<NightWatchConfigState>({
  maxTotalTimeSpent: TWELVE_HOURS_IN_MINUTES,
});
