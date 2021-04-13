import { increaseCharacterSleepTimeAction } from './increaseCharacterSleepTimeAction';
import { ActionType } from 'typesafe-actions';
import { updateCharacterNameAction } from './updateCharacterNameAction';
import { addCharacterAction } from './addCharacterAction';

const ActionCreators = {
  addCharacterAction,
  increaseCharacterSleepTimeAction,
  updateCharacterNameAction,
};

export type CharacterAction = ActionType<typeof ActionCreators>;
