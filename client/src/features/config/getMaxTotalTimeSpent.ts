import { RootState } from '../../app/store/rootStore';

export const getMaxTotalTimeSpent = (state: RootState): number =>
  state.config.maxTotalTimeSpent;
