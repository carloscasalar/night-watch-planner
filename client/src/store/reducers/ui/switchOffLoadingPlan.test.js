import switchOffLoadingPlan from './switchOffLoadingPlan';
import { initialState } from './reducer';
import { getWaitingForPlan } from './selectors';

test('should switch off loading plan', () => {
  const ui = {
    ...initialState(),
    waitingForPlan: true,
  };
  const state = { ui };
  const stateAfterAction = switchOffLoadingPlan(state);
  expect(getWaitingForPlan(stateAfterAction)).toBe(false);
});
