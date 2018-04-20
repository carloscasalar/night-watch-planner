import CharacterEntity from './CharacterEntity';
import CharacterNotFoundException from './CharacterNotFoundException';

const NO_CHARACTERS = [];
const EMPTY_PARTY = {
  characters: NO_CHARACTERS,
};

export default class PartyEntity {
  constructor({ characters = NO_CHARACTERS } = EMPTY_PARTY) {
    this.characters = characters;
  }

  get isEmpty() {
    return this.characters.length === 0;
  }

  findCharacterById(characterId) {
    return this.characters.find(({ id }) => id === characterId);
  }

  findCharacterByName(characterName) {
    return this.characters.find(({ name }) => name === characterName);
  }

  addCharacterWith(name) {
    const id = this.nextCharacterId();
    const character = new CharacterEntity({ id, name });
    this.characters.push(character);
    return this;
  }

  updateCharacter(character) {
    const characterIndex = this.characters.findIndex(({ id }) => id === character.id);
    if (characterIndex < 0) {
      throw new CharacterNotFoundException();
    }

    this.characters[characterIndex] = character;
    return this;
  }

  removeCharacter(character) {
    this.characters = this.characters.filter(({ id }) => id !== character.id);
    return this;
  }

  nextCharacterId() {
    return this.characters.reduce((maxId, { id }) => Math.max(maxId, id), 0) + 1;
  }
}
