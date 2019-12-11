import PartyRepository from '../../../ports/party/PartyRepository';
import UpdateCharacterName from '../../../usecases/party/UpdateCharacterName';

const updateCharacterName = (state, { characterId, newName }) => {
  const partyRepository = new PartyRepository(state);
  const updateNameUseCase = new UpdateCharacterName(partyRepository);
  updateNameUseCase.execute(characterId, newName);

  return partyRepository.state;
};

export default updateCharacterName;
