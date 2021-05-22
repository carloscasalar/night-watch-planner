export default class IncreaseCharacterRequiredSleepTime {
  constructor(PartyRepository) {
    this.partyRepository = PartyRepository;
  }

  execute(characterId, timeIncrement) {
    const party = this.partyRepository
      .getParty();

    party
      .findCharacterById(characterId)
      .increaseRequiredSleepTime(timeIncrement);

    this.partyRepository.save(party);
  }
}
