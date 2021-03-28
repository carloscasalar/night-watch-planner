import { uuid } from 'uuidv4';
import { CharacterEntity, CharacterId } from './CharacterEntity';
import { CharacterNotFoundException } from './CharacterNotFoundException';

const NO_CHARACTERS: CharacterEntity[] = [];
const EMPTY_PARTY = {
  characters: NO_CHARACTERS,
};

export interface PartyEntityOps {
  characters: CharacterEntity[];
}

export class PartyEntity {
  private characters: CharacterEntity[];
  constructor({
    characters = NO_CHARACTERS,
  }: Partial<PartyEntityOps> = EMPTY_PARTY) {
    this.characters = characters;
  }

  get isEmpty(): boolean {
    return this.characters.length === 0;
  }

  findCharacterById(characterId: CharacterId): CharacterEntity {
    const character = this.characters.find(({ id }) => id === characterId);
    if (!character) {
      throw new CharacterNotFoundException();
    }

    return character;
  }

  addCharacterWith(name: string): PartyEntity {
    const id = this.newCharacterId();
    const character = new CharacterEntity({ id, name });
    this.characters.push(character);
    return this;
  }

  updateCharacter(character: CharacterEntity): PartyEntity {
    const characterIndex = this.characters.findIndex(
      ({ id }) => id === character.id,
    );

    this.characters[characterIndex] = character;
    return this;
  }

  removeCharacter(characterId: CharacterId): PartyEntity {
    this.characters = this.characters.filter(({ id }) => id !== characterId);
    return this;
  }

  private newCharacterId(): string {
    return uuid();
  }
}
