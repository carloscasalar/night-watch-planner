import { NightWatchConfigAction } from '../../features/config/NightWatchConfigAction';
import { CharacterAction } from '../../features/character/actions/CharacterAction';

export type ApplicationAction = NightWatchConfigAction | CharacterAction;
