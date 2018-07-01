import switchOnLoadingPlan from './switchOnLoadingPlan';
import { initialState } from './reducer';
import { getWaitingForPlan } from './selectors';

test('should switch on loading plan', () => {
  const ui = {
    ...initialState(),
    waitingForPlan: false,
  };
  const state = { ui };

  const stateAfterAction = switchOnLoadingPlan(state);
  expect(getWaitingForPlan(stateAfterAction)).toBe(true);
});
