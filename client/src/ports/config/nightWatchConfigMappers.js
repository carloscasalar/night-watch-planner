import NightWatchConfigEntity from '../../domain/NightWatchConfigEntity';

export const toNightWatchConfigEntity = nightWatchConfig =>
  new NightWatchConfigEntity(nightWatchConfig);

export const toPlainNightWatchConfigEntity = nightWatchConfigEntity => ({
  maxTotalTimeSpent: nightWatchConfigEntity.maxTotalTimeSpent,
});
