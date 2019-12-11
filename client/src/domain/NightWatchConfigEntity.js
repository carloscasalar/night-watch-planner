const emptyConfig = {};
const TWELVE_HOURS_IN_MINUTES = 12 * 60;
const MIN_TOTAL_TIME_SPENT = 0;
export const DEFAULT_MAX_TIME_SPENT = TWELVE_HOURS_IN_MINUTES;

export default class NightWatchConfigEntity {
  constructor({ maxTotalTimeSpent = DEFAULT_MAX_TIME_SPENT } = emptyConfig) {
    this.maxTotalTimeSpent = maxTotalTimeSpent;
  }

  increaseMaxTotalTimeSpent(time) {
    this.maxTotalTimeSpent = Math.max(this.maxTotalTimeSpent + time, MIN_TOTAL_TIME_SPENT);

    return this;
  }
}
