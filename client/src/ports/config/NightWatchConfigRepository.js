import { toNightWatchConfigEntity, toPlainNightWatchConfigEntity } from './nightWatchConfigAdapters';

export default class NightWatchConfigRepository {
  constructor(state) {
    this.state = state;
  }

  getNightWatchConfig() {
    return toNightWatchConfigEntity(this.state);
  }

  save(nightWatchConfigEntity) {
    const { maxTotalTimeSpent } = toPlainNightWatchConfigEntity(nightWatchConfigEntity);

    this.state = {
      ...this.state,
      maxTotalTimeSpent,
    };
  }
}
