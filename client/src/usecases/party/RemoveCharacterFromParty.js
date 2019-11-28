export default class RemoveCharacterFromParty {
  constructor(PartyRepository) {
    this.partyRepository = PartyRepository;
  }

  execute = (characterId) => {
    const party = this.partyRepository
      .getParty()
      .removeCharacter(characterId);

    this.partyRepository.save(party);
  };
}
