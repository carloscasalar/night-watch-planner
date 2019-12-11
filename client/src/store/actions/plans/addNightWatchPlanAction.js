import { ADD_NIGHT_WATCH_PLAN } from './actions';

const addNightWatchPlanAction = nightWatchPlan => ({
  type: ADD_NIGHT_WATCH_PLAN,
  nightWatchPlan,
});

export default addNightWatchPlanAction;
