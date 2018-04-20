const emptyConfig = {};
const TWELVE_HOURS_IN_MINUTES = 12 * 60;
export const DEFAULT_MAX_TIME_SPENT = TWELVE_HOURS_IN_MINUTES;

export default class NightWatchConfigEntity {
  constructor({ maxTotalTimeSpent = DEFAULT_MAX_TIME_SPENT } = emptyConfig) {
    this.maxTotalTimeSpent = maxTotalTimeSpent;
  }

  increaseMaxTotalTimeSpent(time = 0) {
    this.maxTotalTimeSpent = this.maxTotalTimeSpent + time;

    return this;
  }
}
