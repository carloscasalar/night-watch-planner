import { uuid } from 'uuidv4';
import { CharacterEntity, CharacterId } from './CharacterEntity';
import { CharacterNotFoundException } from './CharacterNotFoundException';
import { toEntityById } from '../common/mappers/toEntityById';

const DEFAULT_REQUIRED_SLEEP_MINUTES = 6 * 60;

type CharactersByID = Record<CharacterId, CharacterEntity>;

export interface PartyEntityOps {
  characters: CharacterEntity[];
}

export class PartyEntity {
  private charactersById: CharactersByID;
  private characterOrder: CharacterId[];
  constructor({ characters }: PartyEntityOps) {
    if (!characters) {
      this.charactersById = {};
      this.characterOrder = [];
      return;
    }
    this.charactersById = toEntityById<CharacterId, CharacterEntity>(
      characters,
    );
    this.characterOrder = characters.map(({ id }) => id);
  }

  get isEmpty(): boolean {
    return this.characterOrder.length === 0;
  }

  findCharacterById(characterId: CharacterId): CharacterEntity {
    const character = this.charactersById[characterId];
    if (!character) {
      throw new CharacterNotFoundException();
    }

    return character;
  }

  addCharacterWith(name: string): PartyEntity {
    const id = this.newCharacterId();
    this.charactersById[id] = new CharacterEntity({
      id,
      name,
      requiredSleepTime: DEFAULT_REQUIRED_SLEEP_MINUTES,
    });
    this.characterOrder = [...this.characterOrder, id];
    return this;
  }

  updateCharacter(character: CharacterEntity): PartyEntity {
    this.charactersById[character.id] = character;
    return this;
  }

  removeCharacter(characterId: CharacterId): PartyEntity {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      [characterId]: characterToRemove,
      ...charactersById
    } = this.charactersById;
    this.charactersById = charactersById;
    this.characterOrder = this.characterOrder.filter(
      (id) => id !== characterId,
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

  updateCharacterName(characterId: CharacterId, name: string): PartyEntity {
    const character = this.findCharacterById(characterId);
    character.updateName(name);

    return this;
  }

  get characters(): CharacterEntity[] {
    return this.characterOrder.map((id) => this.charactersById[id]);
  }

  private newCharacterId(): string {
    return uuid();
  }
}
