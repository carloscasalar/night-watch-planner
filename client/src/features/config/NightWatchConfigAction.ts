import { ActionType } from 'typesafe-actions';
import { increaseCharacterRequiredSleepTime } from './increaseMaxTotalTimeSpentAction';

const ActionCreators = {
  increaseCharacterRequiredSleepTime,
};

export type NightWatchConfigAction = ActionType<typeof ActionCreators>;
