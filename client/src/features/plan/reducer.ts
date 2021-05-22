import { Score, Watch } from './schema';
import { createReducer, RootAction } from 'typesafe-actions';

export interface PlanState {
  fetchState: 'unloaded' | 'loading' | 'error' | 'loaded';
  totalTimeMinutes: number;
  score: Score;
  watches: Record<string, Watch>;
  watchOrder: string[];
}

export const plan = createReducer<PlanState, RootAction>({
  fetchState: 'unloaded',
  totalTimeMinutes: 0,
  score: { feasible: false, hard: -1, medium: -1, soft: -1 },
  watches: {},
  watchOrder: [],
});
