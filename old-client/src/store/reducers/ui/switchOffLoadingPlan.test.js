import switchOffLoadingPlan from './switchOffLoadingPlan';
import { initialState } from './reducer';

test('should switch off loading plan', () => {
  const state = {
    ...initialState(),
    waitingForPlan: true,
  };
  const stateAfterAction = switchOffLoadingPlan(state);
  expect(stateAfterAction.waitingForPlan).toBe(false);
});
