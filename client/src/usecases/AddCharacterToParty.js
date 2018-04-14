export default class AddCharacterToParty {
  constructor(PartyRepository) {
    this.partyRepository = PartyRepository;
  }

    execute = (name) => {
      const party = this.partyRepository
        .getParty()
        .copy()
        .addCharacterWith(name);

      this.partyRepository.save(party);
    }
}
