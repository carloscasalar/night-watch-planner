import {MAX_TOTAL_TIME_SPENT_INCREASE} from './actions';

const increaseMaxTotalTimeSpentAction = (time) => ({
    type: MAX_TOTAL_TIME_SPENT_INCREASE,
    time
});

export default increaseMaxTotalTimeSpentAction;