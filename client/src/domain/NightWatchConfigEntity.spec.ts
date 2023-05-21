import { describe, it, expect } from 'vitest'
import { NightWatchConfigEntity } from './NightWatchConfigEntity'

const TWELVE_HOURS_IN_MINUTES = 720
const SIX_HOURS_IN_MINUTES = 360
const SEVEN_HOURS_IN_MINUTES = 420
const ONE_HOUR_IN_MINUTES = 60

describe('domain/NightWatchConfigEntity', () => {
  describe('constructor', () => {
    it('should initialize the configuration with 12 hours by default', () => {
      const { maxTotalTimeSpent } = new NightWatchConfigEntity()

      expect(maxTotalTimeSpent).toBe(TWELVE_HOURS_IN_MINUTES)
    })

    it('should initialize with the provided max total time spent', () => {
      const maxTotalTimeSpent = SIX_HOURS_IN_MINUTES
      const config = new NightWatchConfigEntity({ maxTotalTimeSpent })

      expect(config.maxTotalTimeSpent).toBe(SIX_HOURS_IN_MINUTES)
    })
  })

  describe('increaseMaxTotalTimeSpent', () => {
    it('should increase the max total time spent in the provided amount', () => {
      const maxTotalTimeSpent = SIX_HOURS_IN_MINUTES
      const config = new NightWatchConfigEntity({ maxTotalTimeSpent })

      config.increaseMaxTotalTimeSpent(ONE_HOUR_IN_MINUTES)

      expect(config.maxTotalTimeSpent).toBe(SEVEN_HOURS_IN_MINUTES)
    })

    it('should not decrease time below zero', () => {
      const maxTotalTimeSpent = ONE_HOUR_IN_MINUTES
      const config = new NightWatchConfigEntity({ maxTotalTimeSpent })

      config.increaseMaxTotalTimeSpent(-SEVEN_HOURS_IN_MINUTES)

      expect(config.maxTotalTimeSpent).toBe(0)
    })
  })
})
