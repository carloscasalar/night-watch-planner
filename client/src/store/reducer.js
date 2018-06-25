import * as actionTypes from './actions/actions';
import addCharacter from './reducers/addCharacter';
import removeCharacter from './reducers/removeCharacter';
import increaseCharacterRequiredSleepTime from './reducers/increaseCharacterRequiredSleepTime';
import updateCharacterName from './reducers/updateCharacterName';
import increaseMaxTotalTimeSpent from './reducers/increaseMaxTotalTimeSpent';
import addNightWatchPlan from './reducers/addNightWatchPlan';
import fetchNightWatchPlanFailed from './reducers/fetchNightWatchPlanFailed';
import { DEFAULT_MAX_TIME_SPENT } from '../domain/NightWatchConfigEntity';

const characters = [];
const initialState = {
  party: {
    characters,
    isEmpty: true,
    names: [],
  },
  maxTotalTimeSpent: DEFAULT_MAX_TIME_SPENT,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHARACTER_ADD:
      return addCharacter(state, action);
    case actionTypes.CHARACTER_REMOVE:
      return removeCharacter(state, action);
    case actionTypes.CHARACTER_SLEEP_TIME_INCREASE:
      return increaseCharacterRequiredSleepTime(state, action);
    case actionTypes.CHARACTER_NAME_UPDATE:
      return updateCharacterName(state, action);
    case actionTypes.MAX_TOTAL_TIME_SPENT_INCREASE:
      return increaseMaxTotalTimeSpent(state, action);
    case actionTypes.ADD_NIGHT_WATCH_PLAN:
      return addNightWatchPlan(state, action);
    case actionTypes.FETCH_NIGHT_WATCH_PLAN_FAILED:
      return fetchNightWatchPlanFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
