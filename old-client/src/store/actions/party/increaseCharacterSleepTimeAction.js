import { CHARACTER_SLEEP_TIME_INCREASE } from './actions';

const increaseCharacterSleepTimeAction = (characterId, time) => ({
  type: CHARACTER_SLEEP_TIME_INCREASE,
  characterId,
  time,
});

export default increaseCharacterSleepTimeAction;
