import { NightWatchConfigRepository } from '../domain/NightWatchConfigRepository';

export class IncreaseMaxTotalTimeSpent {
  constructor(
    private readonly nightWatchConfigRepository: NightWatchConfigRepository,
  ) {}

  execute(timeIncrease: number): void {
    const config = this.nightWatchConfigRepository
      .getNightWatchConfig()
      .increaseMaxTotalTimeSpent(timeIncrease);

    this.nightWatchConfigRepository.save(config);
  }
}
