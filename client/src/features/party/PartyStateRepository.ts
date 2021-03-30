import { PartyRepository } from '../../domain/PartyRepository';
import { PartyState } from './reducer';
import { PartyEntity } from '../../domain/PartyEntity';
import { Character } from '../character/schema';
import { CharacterEntity } from '../../domain/CharacterEntity';

export class PartyStateRepository implements PartyRepository {
  private _state: PartyState;

  constructor(state: PartyState) {
    this._state = { ...state };
  }

  get state(): PartyState {
    return {
      ...this._state,
    };
  }

  getParty(): PartyEntity {
    const { order, characters: chById } = this._state;
    const characters = order.map(
      (characterId) => new CharacterEntity(chById[characterId]),
    );
    return new PartyEntity({ characters });
  }

  save(partyEntity: PartyEntity): void {
    const characterList = partyEntity.characters;
    const order = characterList.map((c) => c.id as string);
    const characters: Record<string, Character> = characterList.reduce(
      (byId, character) => ({
        ...byId,
        [character.id]: { ...character.toJSON() },
      }),
      {},
    );

    this._state = {
      ...this._state,
      order,
      characters,
    };
  }
}
