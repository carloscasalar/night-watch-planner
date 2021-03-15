import NightWatchConfigEntity from './NightWatchConfigEntity';

const TWELVE_HOURS_IN_MINUTES = 12 * 60;
const SIX_HOURS_IN_MINUTES = 6 * 60;

test('night watch configuration max default duration should be 12 hours', () => {
  const { maxTotalTimeSpent } = new NightWatchConfigEntity();

  expect(maxTotalTimeSpent).toBe(TWELVE_HOURS_IN_MINUTES);
});

test('should initialize with the provided max total time spent', () => {
  const maxTotalTimeSpent = SIX_HOURS_IN_MINUTES;
  const config = new NightWatchConfigEntity({ maxTotalTimeSpent });

  expect(config.maxTotalTimeSpent).toBe(SIX_HOURS_IN_MINUTES);
});
