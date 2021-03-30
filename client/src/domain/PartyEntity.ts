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
  private characterList: CharacterEntity[];
  constructor({
    characters = NO_CHARACTERS,
  }: Partial<PartyEntityOps> = EMPTY_PARTY) {
    this.characterList = characters;
  }

  get isEmpty(): boolean {
    return this.characterList.length === 0;
  }

  findCharacterById(characterId: CharacterId): CharacterEntity {
    const character = this.characterList.find(({ id }) => id === characterId);
    if (!character) {
      throw new CharacterNotFoundException();
    }

    return character;
  }

  addCharacterWith(name: string): PartyEntity {
    const id = this.newCharacterId();
    const character = new CharacterEntity({ id, name });
    this.characterList.push(character);
    return this;
  }

  updateCharacter(character: CharacterEntity): PartyEntity {
    const characterIndex = this.characterList.findIndex(
      ({ id }) => id === character.id,
    );

    this.characterList[characterIndex] = character;
    return this;
  }

  removeCharacter(characterId: CharacterId): PartyEntity {
    this.characterList = this.characterList.filter(
      ({ id }) => id !== characterId,
    );
    return this;
  }

  increaseCharacterSleepTime(
    characterId: CharacterId,
    timeIncrement: number,
  ): PartyEntity {
    const character = this.findCharacterById(characterId);
    character.increaseRequiredSleepTime(timeIncrement);

    return this;
  }

  get characters(): CharacterEntity[] {
    return [...this.characterList];
  }

  private newCharacterId(): string {
    return uuid();
  }
}
