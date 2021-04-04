import { RootState } from 'typesafe-actions';

export const testRootState: RootState = {
  party: {
    characters: {},
    order: [],
  },
  config: {
    maxTotalTimeSpent: 12 * 60,
  },
};
