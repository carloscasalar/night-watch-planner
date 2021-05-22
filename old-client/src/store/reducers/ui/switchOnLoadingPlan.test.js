import switchOnLoadingPlan from './switchOnLoadingPlan';
import { initialState } from './reducer';

test('should switch on loading plan', () => {
  const state = {
    ...initialState(),
    waitingForPlan: false,
  };

  const stateAfterAction = switchOnLoadingPlan(state);
  expect(stateAfterAction.waitingForPlan).toBe(true);
});
