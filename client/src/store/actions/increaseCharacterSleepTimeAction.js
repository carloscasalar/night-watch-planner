import {CHARACTER_SLEEP_TIME_INCREASE} from './actions';

const increaseCharacterSleepTimeAction = (characterName, time) => ({
    type: CHARACTER_SLEEP_TIME_INCREASE,
    characterName,
    time
});

export default increaseCharacterSleepTimeAction;