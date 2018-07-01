import { toNightWatchConfigEntity, toPlainNightWatchConfigEntity } from './nightWatchConfigAdapters';
import { getConfig } from '../../store/reducers/config/selectors';

export default class NightWatchConfigRepository {
  constructor(state) {
    this.state = state;
  }

  getNightWatchConfig() {
    return toNightWatchConfigEntity(getConfig(this.state));
  }

  save(nightWatchConfigEntity) {
    const { maxTotalTimeSpent } = toPlainNightWatchConfigEntity(nightWatchConfigEntity);

    const config = {
      ...getConfig(this.state),
      maxTotalTimeSpent,
    };

    this.state = {
      ...this.state,
      config,
    };
  }
}
