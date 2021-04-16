import { increaseCharacterSleepTimeAction } from './increaseCharacterSleepTimeAction';
import { ActionType } from 'typesafe-actions';
import { updateCharacterNameAction } from './updateCharacterNameAction';
import { addCharacterAction } from './addCharacterAction';
import { removeCharacterAction } from './removeCharacterAction';

const ActionCreators = {
  addCharacterAction,
  increaseCharacterSleepTimeAction,
  removeCharacterAction,
  updateCharacterNameAction,
};

export type CharacterAction = ActionType<typeof ActionCreators>;
