import { increaseCharacterSleepTimeAction } from './increaseCharacterSleepTimeAction';
import { ActionType } from 'typesafe-actions';

const ActionCreators = {
  increaseCharacterSleepTime: increaseCharacterSleepTimeAction,
};

export type CharacterAction = ActionType<typeof ActionCreators>;
