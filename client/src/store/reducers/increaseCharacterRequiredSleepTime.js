import PartyRepository from '../../ports/PartyRepository';
import IncreaseCharacterRequiredSleepTime from '../../usecases/IncreaseCharacterRequiredSleepTime';

const increaseCharacterRequiredSleepTime = (state, { characterName, time }) => {
  const partyRepository = new PartyRepository(state);
  const increaseCharacterRequiredSleepTimeUseCase = new IncreaseCharacterRequiredSleepTime(partyRepository);
  increaseCharacterRequiredSleepTimeUseCase.execute(characterName, time);

  return partyRepository.state;
};

export default increaseCharacterRequiredSleepTime;

