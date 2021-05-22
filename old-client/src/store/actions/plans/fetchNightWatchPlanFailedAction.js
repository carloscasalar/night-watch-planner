import { FETCH_NIGHT_WATCH_PLAN_FAILED } from './actions';

const fetchNightWatchPlanFailedAction = error => ({
  type: FETCH_NIGHT_WATCH_PLAN_FAILED,
  error,
});

export default fetchNightWatchPlanFailedAction;
