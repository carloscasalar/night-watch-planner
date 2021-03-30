import { NightWatchConfigAction } from '../../features/config/NightWatchConfigAction';
import { CharacterAction } from '../../features/character/CharacterAction';

export type ApplicationAction = NightWatchConfigAction | CharacterAction;
