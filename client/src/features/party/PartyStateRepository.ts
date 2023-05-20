import { toEntityById } from '@mappers/toEntityById'
import { type PartyRepository } from '@domain/PartyRepository'
import { PartyEntity } from '@domain/PartyEntity'
import { CharacterEntity } from '@domain/CharacterEntity'
import { type Character } from '@features/character/schema'
import { type PartyState } from './reducer'

export class PartyStateRepository implements PartyRepository {
  private _state: PartyState

  constructor (state: PartyState) {
    this._state = { ...state }
  }

  get state (): PartyState {
    return {
      ...this._state
    }
  }

  getParty (): PartyEntity {
    const { order, characters: chById } = this._state
    const characters = order.map(
      (characterId) => new CharacterEntity(chById[characterId])
    )
    return new PartyEntity({ characters })
  }

  save (partyEntity: PartyEntity): void {
    const characterList: Character[] = partyEntity.characters.map((character) =>
      character.serialize()
    )
    const order: string[] = characterList.map((c) => c.id)
    const characters = toEntityById<string, Character>(characterList)

    this._state = {
      ...this._state,
      order,
      characters
    }
  }
}
