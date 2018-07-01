import { getUi } from './selectors';

const switchOnLoadingPlan = (state) => {
  const ui = getUi(state);
  return {
    ...state,
    ui: {
      ...ui,
      waitingForPlan: true,
    },
  };
};

export default switchOnLoadingPlan;
