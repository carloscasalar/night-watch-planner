import CharacterEntity from './CharacterEntity';

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

  addCharacterWith(name) {
    const id = this.nextCharacterId();
    const character = new CharacterEntity({ id, name });
    this.characters.push(character);
    return this;
  }

  updateCharacter(character) {
    const characterIndex = this.characters.findIndex(({ id }) => id === character.id);

    this.characters[characterIndex] = character;
    return this;
  }

  removeCharacter(characterId) {
    this.characters = this.characters.filter(({ id }) => id !== characterId);
    return this;
  }

  nextCharacterId() {
    return this.characters.reduce((maxId, { id }) => Math.max(maxId, id), 0) + 1;
  }
}
