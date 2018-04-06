import * as actionTypes from './actions/actions';
import addCharacter from './reducers/addCharacter';
import removeCharacter from './reducers/removeCharacter';
import addRequiredSleepTimeToCharacter from './reducers/addRequiredSleepTimeToCharacter';
import updateCharacterName from './reducers/updateCharacterName';
import addTimeToMaxTotalTimeSpent from "./reducers/addTimeToMaxTotalTimeSpent";

const TWELVE_HOURS_IN_MINUTES = 60 * 12;

const initialState = {
    party: [],
    maxTotalTimeSpent: TWELVE_HOURS_IN_MINUTES,
    characterCounter: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.CHARACTER_ADD:
            return addCharacter(state, action);
        case actionTypes.CHARACTER_REMOVE:
            return removeCharacter(state, action);
        case actionTypes.CHARACTER_SLEEP_TIME_INCREASE:
            return addRequiredSleepTimeToCharacter(state, action);
        case actionTypes.CHARACTER_NAME_UPDATE:
            return updateCharacterName(state, action);
        case actionTypes.MAX_TOTAL_TIME_SPENT_INCREASE:
            return addTimeToMaxTotalTimeSpent(state, action);
        default:
            return state;
    }
};

export default reducer;
