import { SWITCH_OFF_LOADING_PLAN, SWITCH_ON_LOADING_PLAN } from '../../actions/ui/actions';
import switchOnLoadingPlan from './switchOnLoadingPlan';
import switchOffLoadingPlan from './switchOffLoadingPlan';

export const initialState = () => ({
  ui: {
    waitingForPlan: false,
  },
});

export const uiReducer = (state = initialState(), action) => {
  switch (action.type) {
    case SWITCH_ON_LOADING_PLAN:
      return switchOnLoadingPlan(state, action);
    case SWITCH_OFF_LOADING_PLAN:
      return switchOffLoadingPlan(state, action);
    default:
      return state;
  }
};
