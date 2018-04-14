import AddCharacterToParty from '../../usecases/AddCharacterToParty';
import PartyRepository from '../../ports/PartyRepository';

const addCharacter = (state, { name }) => {
  const partyRepository = new PartyRepository(state);
  const addCharacterUseCase = new AddCharacterToParty(partyRepository);
  addCharacterUseCase.execute(name);

  return partyRepository.state;
};

export default addCharacter;
