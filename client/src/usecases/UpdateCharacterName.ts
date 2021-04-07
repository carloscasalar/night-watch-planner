import { PartyRepository } from '../domain/PartyRepository';
import { CharacterId } from '../domain/CharacterEntity';

export class UpdateCharacterName {
  constructor(private readonly partyRepository: PartyRepository) {}

  execute(characterId: CharacterId, name: string): void {
    const party = this.partyRepository
      .getParty()
      .updateCharacterName(characterId, name);

    this.partyRepository.save(party);
  }
}
