import NightWatchConfigRepository from './NightWatchConfigRepository';
import NightWatchConfigEntity from '../../domain/NightWatchConfigEntity';

const ONE_HOUR_IN_MINUTES = 60;

test('getNightWatchConfig should return the night watch config', () => {
  const state = {
    maxTotalTimeSpent: ONE_HOUR_IN_MINUTES,
  };

  const repository = new NightWatchConfigRepository(state);

  const config = repository.getNightWatchConfig();

  expect(config).toBeInstanceOf(NightWatchConfigEntity);
  expect(config).toHaveProperty('maxTotalTimeSpent', ONE_HOUR_IN_MINUTES);
});

test('save should persist a state with night watch config attributes', () => {
  const repository = new NightWatchConfigRepository({});

  const domainConfig = new NightWatchConfigEntity({
    maxTotalTimeSpent: ONE_HOUR_IN_MINUTES,
  });

  repository.save(domainConfig);
  expect(repository.state).toHaveProperty('maxTotalTimeSpent', ONE_HOUR_IN_MINUTES);
});

test('should not mutate state', () => {
  const initialState = {};
  const configRepository = new NightWatchConfigRepository(initialState);
  expect(configRepository.state).toBe(configRepository.state);

  configRepository.save(new NightWatchConfigEntity());

  expect(initialState).not.toBe(configRepository.state);
});

test('save should preserve other state attributes different than config', () => {
  const otherAttr = 'A';
  const anotherAttr = 'B';
  const state = { otherAttr, anotherAttr };
  const configRepository = new NightWatchConfigRepository(state);

  configRepository.save(new NightWatchConfigEntity({}));

  expect(configRepository.state).toHaveProperty('otherAttr', 'A');
  expect(configRepository.state).toHaveProperty('anotherAttr', 'B');
});
