import { CHARACTER_NAME_UPDATE } from './actions';

const updateCharacterNameAction = (character, newName) => ({
  type: CHARACTER_NAME_UPDATE,
  character,
  newName,
});

export default updateCharacterNameAction;
