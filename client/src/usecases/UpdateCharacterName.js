export default class UpdateCharacterName {
    constructor(PartyRepository) {
        this.partyRepository = PartyRepository;
    }

    execute = (characterId, name) => {
        const party = this.partyRepository
            .getParty()
            .copy();

        const character = party
            .findCharacterById(characterId)
            .updateName(name);

        party.updateCharacter(character);

        this.partyRepository.save(party);
    }
}
