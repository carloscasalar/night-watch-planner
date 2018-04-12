import PartyRepository from '../../ports/PartyRepository';
import RemoveCharacterFromParty from '../../usecases/RemoveCharacterFromParty';

const removeCharacter = (state, {character}) => {
    const partyRepository = new PartyRepository(state);
    const removeCharacterUseCase = new RemoveCharacterFromParty(partyRepository);
    removeCharacterUseCase.execute(character);

    return partyRepository.state;
};

export default removeCharacter;
