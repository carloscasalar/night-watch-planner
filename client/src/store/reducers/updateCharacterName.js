import PartyRepository from '../../ports/PartyRepository';
import UpdateCharacterName from '../../usecases/UpdateCharacterName';

const updateCharacterName = (state, { character: { id: characterId }, newName }) => {
  const partyRepository = new PartyRepository(state);
  const updateNameUseCase = new UpdateCharacterName(partyRepository);
  updateNameUseCase.execute(characterId, newName);

  return partyRepository.state;
};

export default updateCharacterName;
