import * as actionTypes from './actions/actions';
import { uiReducer } from './reducers/ui/reducer';
import addCharacter from './reducers/addCharacter';
import removeCharacter from './reducers/removeCharacter';
import increaseCharacterRequiredSleepTime from './reducers/config/increaseCharacterRequiredSleepTime';
import updateCharacterName from './reducers/updateCharacterName';
import addNightWatchPlan from './reducers/addNightWatchPlan';
import fetchNightWatchPlanFailed from './reducers/fetchNightWatchPlanFailed';
import { DEFAULT_MAX_TIME_SPENT } from '../domain/NightWatchConfigEntity';
import { MAX_TOTAL_TIME_SPENT_INCREASE } from './actions/config/actions';
import { configReducer } from './reducers/config/reducer';

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
    case actionTypes.CHARACTER_ADD:
      return addCharacter(state, action);
    case actionTypes.CHARACTER_REMOVE:
      return removeCharacter(state, action);
    case actionTypes.CHARACTER_SLEEP_TIME_INCREASE:
      return increaseCharacterRequiredSleepTime(state, action);
    case actionTypes.CHARACTER_NAME_UPDATE:
      return updateCharacterName(state, action);
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
