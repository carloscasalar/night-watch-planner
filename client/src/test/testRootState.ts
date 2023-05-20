import { type RootState } from '@app/store/rootStore'

export const testRootState: RootState = {
  party: {
    characters: {},
    order: []
  },
  config: {
    maxTotalTimeSpent: 12 * 60
  },
  plan: {
    message: null,
    totalTimeMinutes: 0,
    score: { feasible: false, hard: -1, medium: -1, soft: -1 },
    watches: {},
    watchOrder: []
  }
}
