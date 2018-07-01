import {
  CHARACTER_ADD,
  CHARACTER_NAME_UPDATE,
  CHARACTER_REMOVE,
  CHARACTER_SLEEP_TIME_INCREASE,
} from '../../actions/party/actions';
import addCharacter from './addCharacter';
import increaseCharacterRequiredSleepTime from '../config/increaseCharacterRequiredSleepTime';
import removeCharacter from './removeCharacter';
import updateCharacterName from './updateCharacterName';

const characters = [];
export const initialState = () => ({
  characters,
  isEmpty: true,
  names: [],
});

export const partyReducer = (state = initialState(), action) => {
  switch (action.type) {
    case CHARACTER_ADD:
      return addCharacter(state, action);
    case CHARACTER_REMOVE:
      return removeCharacter(state, action);
    case CHARACTER_SLEEP_TIME_INCREASE:
      return increaseCharacterRequiredSleepTime(state, action);
    case CHARACTER_NAME_UPDATE:
      return updateCharacterName(state, action);
    default:
      return state;
  }
};
