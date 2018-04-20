import { CHARACTER_REMOVE } from './actions';

const removeCharacterAction = characterId => ({
  type: CHARACTER_REMOVE,
  characterId,
});

export default removeCharacterAction;
