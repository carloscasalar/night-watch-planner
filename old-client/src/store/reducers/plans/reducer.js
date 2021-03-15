import fetchNightWatchPlanFailed from './fetchNightWatchPlanFailed';
import addNightWatchPlan from './addNightWatchPlan';
import { ADD_NIGHT_WATCH_PLAN, FETCH_NIGHT_WATCH_PLAN_FAILED } from '../../actions/plans/actions';

export const initialState = () => ({});

export const plansReducer = (state = initialState(), action) => {
  switch (action.type) {
    case ADD_NIGHT_WATCH_PLAN:
      return addNightWatchPlan(state, action);
    case FETCH_NIGHT_WATCH_PLAN_FAILED:
      return fetchNightWatchPlanFailed(state, action);
    default:
      return state;
  }
};
