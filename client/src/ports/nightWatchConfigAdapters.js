import NightWatchConfigEntity from '../domain/NightWatchConfigEntity';

export const toNightWatchConfigEntity = maxTotalTimeSpent =>
  new NightWatchConfigEntity({ maxTotalTimeSpent });

export const toPlainNightWatchConfigEntity = nightWatchConfigEntity => ({
  maxTotalTimeSpent: nightWatchConfigEntity.maxTotalTimeSpent,
});
