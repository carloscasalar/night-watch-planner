import NightWatchConfigRepository from '../../../ports/config/NightWatchConfigRepository';
import IncreaseMaxTotalTimeSpent from '../../../usecases/config/IncreaseMaxTotalTimeSpent';

const increaseMaxTotalTimeSpent = (state, { time }) => {
  const nightWatchConfigRepository = new NightWatchConfigRepository(state);
  const increaseMaxTimeSpentUseCase = new IncreaseMaxTotalTimeSpent(nightWatchConfigRepository);
  increaseMaxTimeSpentUseCase.execute(time);

  return nightWatchConfigRepository.state;
};

export default increaseMaxTotalTimeSpent;

