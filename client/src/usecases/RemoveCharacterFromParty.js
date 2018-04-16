export default class RemoveCharacterFromParty {
  constructor(PartyRepository) {
    this.partyRepository = PartyRepository;
  }

    execute = (character) => {
      const party = this.partyRepository
        .getParty()
        .removeCharacter(character);

      this.partyRepository.save(party);
    };
}
