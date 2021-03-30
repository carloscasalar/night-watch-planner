import { createReducer, RootAction } from 'typesafe-actions';
import { increaseMaxTotalTimeSpentTimeAction } from './increaseMaxTotalTimeSpentAction';
import { NightWatchConfigStateRepository } from './NightWatchConfigStateRepository';
import { IncreaseMaxTotalTimeSpent } from '../../usecases/IncreaseMaxTotalTimeSpent';

const TWELVE_HOURS_IN_MINUTES = 12 * 60;

export interface NightWatchConfigState {
  maxTotalTimeSpent: number;
}

export const config = createReducer<NightWatchConfigState, RootAction>({
  maxTotalTimeSpent: TWELVE_HOURS_IN_MINUTES,
}).handleAction(
  increaseMaxTotalTimeSpentTimeAction,
  (state, { payload: timeIncrement }) => {
    const repository = new NightWatchConfigStateRepository(state);
    const useCase = new IncreaseMaxTotalTimeSpent(repository);

    useCase.execute(timeIncrement);

    return repository.state;
  },
);
