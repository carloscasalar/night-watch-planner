import switchOffLoadingPlan from './switchOffLoadingPlan';
import { initialState } from '../../reducer';
import { getWaitingForPlan } from './selectors';

test('should switch off loading plan', () => {
  const state = initialState();
  state.ui.waitingForPlan = true;

  const stateAfterAction = switchOffLoadingPlan(state);
  expect(getWaitingForPlan(stateAfterAction)).toBe(false);
});
