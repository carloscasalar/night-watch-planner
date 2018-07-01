import switchOnLoadingPlan from './switchOnLoadingPlan';
import { initialState } from '../../reducer';
import { getWaitingForPlan } from './selectors';

test('should switch on loading plan', () => {
  const state = initialState();
  state.ui.waitingForPlan = false;

  const stateAfterAction = switchOnLoadingPlan(state);
  expect(getWaitingForPlan(stateAfterAction)).toBe(true);
});
