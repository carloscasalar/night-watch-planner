import AddCharacterToParty from '../../usecases/party/AddCharacterToParty';
import PartyRepository from '../../ports/party/PartyRepository';

const addCharacter = (state, { name }) => {
  const partyRepository = new PartyRepository(state);
  const addCharacterUseCase = new AddCharacterToParty(partyRepository);
  addCharacterUseCase.execute(name);

  return partyRepository.state;
};

export default addCharacter;
