import { type PartyRepository } from '../domain/PartyRepository'
import { type CharacterId } from '../domain/CharacterEntity'

export class RemoveCharacter {
  constructor (private readonly partyRepository: PartyRepository) {}

  execute (characterId: CharacterId): void {
    const party = this.partyRepository.getParty().removeCharacter(characterId)

    this.partyRepository.save(party)
  }
}
