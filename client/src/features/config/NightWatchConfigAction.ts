import { ActionType } from 'typesafe-actions';
import { increaseMaxTotalTimeSpentTime } from './increaseMaxTotalTimeSpentAction';

const ActionCreators = {
  increaseCharacterRequiredSleepTime: increaseMaxTotalTimeSpentTime,
};

export type NightWatchConfigAction = ActionType<typeof ActionCreators>;
