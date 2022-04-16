import { RootState } from 'typesafe-actions';

export const testRootState: RootState = {
  party: {
    characters: {},
    order: [],
  },
  config: {
    maxTotalTimeSpent: 12 * 60,
  },
  plan: {
    fetchState: 'unloaded',
    message: null,
    totalTimeMinutes: 0,
    score: { feasible: false, hard: -1, medium: -1, soft: -1 },
    watches: {},
    watchOrder: [],
  },
};
