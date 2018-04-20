import PartyRepository from '../../ports/PartyRepository';
import RemoveCharacterFromParty from '../../usecases/party/RemoveCharacterFromParty';

const removeCharacter = (state, { characterId }) => {
  const partyRepository = new PartyRepository(state);
  const removeCharacterUseCase = new RemoveCharacterFromParty(partyRepository);
  removeCharacterUseCase.execute(characterId);

  return partyRepository.state;
};

export default removeCharacter;
