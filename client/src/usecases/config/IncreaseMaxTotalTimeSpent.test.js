import nightWatchConfigRepositoryStub from '../stub/nightWatchConfigRepository';
import IncreaseMaxTotalTimeSpent from './IncreaseMaxTotalTimeSpent';
import { firstParameterOfFirstCallTo } from '../../jest/utils';
import NightWatchConfigEntity from '../../domain/NightWatchConfigEntity';

const TEN_HOURS_IN_MINUTES = 10 * 60;
const ELEVEN_HOURS_IN_MINUTES = 11 * 60;
const MINUS_ELEVEN_HOURS_IN_MINUTES = - ELEVEN_HOURS_IN_MINUTES;
const ONE_HOUR_IN_MINUTES = 60;
const ZERO_HOURS = 0;

test('should increase config max total time spent', () => {
  const nightWatchConfig = new NightWatchConfigEntity({
    maxTotalTimeSpent: TEN_HOURS_IN_MINUTES,
  });
  const nightWatchConfigRepository = nightWatchConfigRepositoryStub(nightWatchConfig);
  const increaseMaxTotalTimeSpent = new IncreaseMaxTotalTimeSpent(nightWatchConfigRepository);

  increaseMaxTotalTimeSpent.execute(ONE_HOUR_IN_MINUTES);
  const savedConfig = firstParameterOfFirstCallTo(nightWatchConfigRepository.save);

  expect(savedConfig.maxTotalTimeSpent).toBe(ELEVEN_HOURS_IN_MINUTES);
});

test('minimun total time spent should be zero', () => {
  const nightWatchConfig = new NightWatchConfigEntity({
    maxTotalTimeSpent: TEN_HOURS_IN_MINUTES,
  });
  const nightWatchConfigRepository = nightWatchConfigRepositoryStub(nightWatchConfig);
  const increaseMaxTotalTimeSpent = new IncreaseMaxTotalTimeSpent(nightWatchConfigRepository);

  increaseMaxTotalTimeSpent.execute(MINUS_ELEVEN_HOURS_IN_MINUTES);

  const savedConfig = firstParameterOfFirstCallTo(nightWatchConfigRepository.save);
  expect(savedConfig.maxTotalTimeSpent).toBe(ZERO_HOURS);
});
