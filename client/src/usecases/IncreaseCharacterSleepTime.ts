import { type PartyRepository } from '../domain/PartyRepository'
import { type CharacterId } from '../domain/CharacterEntity'

export class IncreaseCharacterSleepTime {
  constructor (private readonly partyRepository: PartyRepository) {}

  execute (characterId: CharacterId, minutes: number): void {
    const party = this.partyRepository
      .getParty()
      .increaseCharacterSleepTime(characterId, minutes)

    this.partyRepository.save(party)
  }
}
