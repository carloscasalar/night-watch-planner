import { CHARACTER_ADD } from './actions';

const addCharacterAction = name => ({
  type: CHARACTER_ADD,
  name,
});

export default addCharacterAction;
