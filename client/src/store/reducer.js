import * as actionTypes from './actions';
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
        case actionTypes.ADD_CHARACTER:
            return addCharacter(state, action);
        case actionTypes.REMOVE_CHARACTER:
            return removeCharacter(state, action);
        case actionTypes.ADD_SLEEP_TIME_TO_CHARACTER:
            return addRequiredSleepTimeToCharacter(state, action);
        case actionTypes.UPDATE_CHARACTER_NAME:
            return updateCharacterName(state, action);
        case actionTypes.ADD_TIME_TO_MAX_TOTAL_TIME_SPENT:
            return addTimeToMaxTotalTimeSpent(state, action);
        default:
            return state;
    }
};

export default reducer;
