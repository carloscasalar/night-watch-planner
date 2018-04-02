const MIN_TIME = 0;

const addTimeToMaxTotalTimeSpent = (state, { time }) => ({
    ...state,
    maxTotalTimeSpent: Math.max(MIN_TIME, state.maxTotalTimeSpent + time)
});

export default addTimeToMaxTotalTimeSpent;


