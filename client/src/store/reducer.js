import * as actionTypes from './actions/actions';
import addCharacter from './reducers/addCharacter';
import removeCharacter from './reducers/removeCharacter';
import increaseCharacterRequiredSleepTime from './reducers/increaseCharacterRequiredSleepTime';
import updateCharacterName from './reducers/updateCharacterName';
import increaseMaxTotalTimeSpent from './reducers/increaseMaxTotalTimeSpent';
import PartyEntity from '../domain/PartyEntity';

const TWELVE_HOURS_IN_MINUTES = 60 * 12;

const initialState = {
    party: new PartyEntity(),
    maxTotalTimeSpent: TWELVE_HOURS_IN_MINUTES
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
        default:
            return state;
    }
};

export default reducer;
