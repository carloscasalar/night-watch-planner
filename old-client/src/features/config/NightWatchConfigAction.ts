import { ActionType } from 'typesafe-actions';
import { increaseMaxTotalTimeSpentTimeAction } from './increaseMaxTotalTimeSpentAction';

const ActionCreators = {
  increaseCharacterRequiredSleepTime: increaseMaxTotalTimeSpentTimeAction,
};

export type NightWatchConfigAction = ActionType<typeof ActionCreators>;
