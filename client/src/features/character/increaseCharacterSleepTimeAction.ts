import { createAction } from 'typesafe-actions';

export interface IncreaseCharacterSleepTimePayload {
  characterId: string;
  minutes: number;
}

export const increaseCharacterSleepTimeAction = createAction(
  'INCREASE_CHARACTER_REQUIRED_SLEEP_TIME',
)<IncreaseCharacterSleepTimePayload>();
