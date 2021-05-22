import { NightWatchConfigEntity } from './NightWatchConfigEntity';

export interface NightWatchConfigRepository {
  getNightWatchConfig: () => NightWatchConfigEntity;
  save: (nightWatchConfig: NightWatchConfigEntity) => void;
}
