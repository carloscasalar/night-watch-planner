import { toNightWatchConfigEntity, toPlainNightWatchConfigEntity } from './nightWatchConfigAdapters';

export default class NightWatchConfigRepository {
  constructor(state) {
    this.state = state;
  }

  getNightWatchConfig() {
    return toNightWatchConfigEntity(this.state.config);
  }

  save(nightWatchConfigEntity) {
    const { maxTotalTimeSpent } = toPlainNightWatchConfigEntity(nightWatchConfigEntity);

    const config = {
      ...this.state.config,
      maxTotalTimeSpent,
    };

    this.state = {
      ...this.state,
      config,
    };
  }
}
