import { NightWatchConfigAction } from '../../features/config/NightWatchConfigAction';
import { CharacterAction } from '../../features/character/actions/CharacterAction';
import { PlanAction } from '../../features/plan/actions/PlanAction';

export type ApplicationAction =
  | NightWatchConfigAction
  | CharacterAction
  | PlanAction;
