const addNightWatchPlan = (state, { nightWatchPlan }) => {
  const { watchesSummary, totalTime, score } = nightWatchPlan;

  let watchId = 0;
  const watches = watchesSummary.map((w) => {
    watchId += 1;
    const id = watchId;
    return {
      ...w,
      id,
    };
  });
  return {
    ...state,
    plan: {
      watches,
      totalTime,
      score,
    },
  };
};

export default addNightWatchPlan;
