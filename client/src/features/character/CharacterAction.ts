import { increaseCharacterSleepTimeAction } from './increaseCharacterSleepTimeAction';
import { ActionType } from 'typesafe-actions';
import { updateCharacterNameAction } from './updateCharacterNameAction';

const ActionCreators = {
  increaseCharacterSleepTimeAction,
  updateCharacterNameAction,
};

export type CharacterAction = ActionType<typeof ActionCreators>;
