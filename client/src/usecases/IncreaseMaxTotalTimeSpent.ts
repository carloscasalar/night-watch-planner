import { type NightWatchConfigRepository } from '../domain/NightWatchConfigRepository'

export class IncreaseMaxTotalTimeSpent {
  constructor (
    private readonly nightWatchConfigRepository: NightWatchConfigRepository
  ) {}

  execute (minutes: number): void {
    const config = this.nightWatchConfigRepository
      .getNightWatchConfig()
      .increaseMaxTotalTimeSpent(minutes)

    this.nightWatchConfigRepository.save(config)
  }
}
