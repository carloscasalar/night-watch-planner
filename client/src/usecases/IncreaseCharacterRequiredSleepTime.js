export default class IncreaseCharacterRequiredSleepTime {
  constructor(PartyRepository) {
    this.partyRepository = PartyRepository;
  }

  execute(characterName, timeIncrement) {
    const party = this.partyRepository
      .getParty();

    const character = party
      .findCharacterByName(characterName)
      .increaseRequiredSleepTime(timeIncrement);

    party.updateCharacter(character);

    this.partyRepository.save(party);
  }
}
