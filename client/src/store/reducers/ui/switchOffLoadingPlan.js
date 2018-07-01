import { getUi } from './selectors';

const switchOffLoadingPlan = (state) => {
  const ui = getUi(state);
  return {
    ...state,
    ui: {
      ...ui,
      waitingForPlan: false,
    },
  };
};

export default switchOffLoadingPlan;
