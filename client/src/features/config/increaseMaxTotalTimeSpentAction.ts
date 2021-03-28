import { createAction } from 'typesafe-actions';

export const increaseCharacterRequiredSleepTime = createAction(
  'INCREASE_CHARACTER_REQUIRED_SLEEP_TIME',
)<number>();
