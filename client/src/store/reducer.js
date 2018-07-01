import * as actionTypes from './actions/actions';
import { uiReducer } from './reducers/ui/reducer';
import addNightWatchPlan from './reducers/addNightWatchPlan';
import fetchNightWatchPlanFailed from './reducers/fetchNightWatchPlanFailed';
import { DEFAULT_MAX_TIME_SPENT } from '../domain/NightWatchConfigEntity';
import { MAX_TOTAL_TIME_SPENT_INCREASE } from './actions/config/actions';
import { configReducer } from './reducers/config/reducer';
import {
  CHARACTER_ADD,
  CHARACTER_NAME_UPDATE,
  CHARACTER_REMOVE,
  CHARACTER_SLEEP_TIME_INCREASE,
} from './actions/party/actions';
import { partyReducer } from './reducers/party/reducer';

const characters = [];
export const initialState = () => ({
  party: {
    characters,
    isEmpty: true,
    names: [],
  },
  config: {
    maxTotalTimeSpent: DEFAULT_MAX_TIME_SPENT,
  },
  ui: {
    waitingForPlan: false,
  },
});

const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case CHARACTER_ADD:
    case CHARACTER_REMOVE:
    case CHARACTER_SLEEP_TIME_INCREASE:
    case CHARACTER_NAME_UPDATE:
      return partyReducer(state, action);
    case MAX_TOTAL_TIME_SPENT_INCREASE:
      return configReducer(state, action);
    case actionTypes.ADD_NIGHT_WATCH_PLAN:
      return addNightWatchPlan(state, action);
    case actionTypes.FETCH_NIGHT_WATCH_PLAN_FAILED:
      return fetchNightWatchPlanFailed(state, action);
    default:
      return uiReducer(state, action);
  }
};

export default reducer;
