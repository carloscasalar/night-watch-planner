const TWELVE_HOURS_IN_MINUTES = 12 * 60
const MIN_TOTAL_TIME_SPENT = 0
export const DEFAULT_MAX_TIME_SPENT = TWELVE_HOURS_IN_MINUTES

export interface NightWatchConfigEntityOpts {
  maxTotalTimeSpent: number
}

const defaultOps: NightWatchConfigEntityOpts = {
  maxTotalTimeSpent: DEFAULT_MAX_TIME_SPENT
}

export class NightWatchConfigEntity {
  constructor (private readonly config: NightWatchConfigEntityOpts = defaultOps) {}

  increaseMaxTotalTimeSpent (time: number): NightWatchConfigEntity {
    const { maxTotalTimeSpent } = this.config
    this.config.maxTotalTimeSpent = Math.max(
      maxTotalTimeSpent + time,
      MIN_TOTAL_TIME_SPENT
    )

    return this
  }

  get maxTotalTimeSpent (): number {
    return this.config.maxTotalTimeSpent
  }
}
