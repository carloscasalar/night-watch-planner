const fetchNightWatchPlanFailed = (state, { error }) => {
  console.error('processing nightWatchPlan ERROR from backend:', error);
  return { ...state };
};

export default fetchNightWatchPlanFailed;
