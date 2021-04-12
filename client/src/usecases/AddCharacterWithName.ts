import { PartyRepository } from '../domain/PartyRepository';

export class AddCharacterWithName {
  constructor(private readonly partyRepository: PartyRepository) {}

  execute(name: string): void {
    const party = this.partyRepository.getParty().addCharacterWith(name);

    this.partyRepository.save(party);
  }
}
