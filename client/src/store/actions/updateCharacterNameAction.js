import { CHARACTER_NAME_UPDATE } from './actions';

const updateCharacterNameAction = (characterId, newName) => ({
  type: CHARACTER_NAME_UPDATE,
  characterId,
  newName,
});

export default updateCharacterNameAction;
