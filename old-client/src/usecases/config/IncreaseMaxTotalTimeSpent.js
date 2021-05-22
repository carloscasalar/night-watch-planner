export default class IncreaseMaxTotalTimeSpent {
  constructor(nightWatchConfigRepository) {
    this.nightWatchConfigRepository = nightWatchConfigRepository;
  }

  execute(timeIncrease) {
    const config = this.nightWatchConfigRepository.getNightWatchConfig()
      .increaseMaxTotalTimeSpent(timeIncrease);

    this.nightWatchConfigRepository.save(config);
  }
}
