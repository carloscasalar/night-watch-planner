import { createReducer, RootAction } from 'typesafe-actions';
import { Score, Watch } from './schema';
import { actionCreators } from './actions/PlanAction';
import { toIndexedRecordAndOrder } from '../../common/mappers/toIndexedRecordAndOrder';
import { v4 as uuid } from 'uuid';

export type FetchState = 'unloaded' | 'loading' | 'error' | 'loaded';

export interface PlanState {
  fetchState: FetchState;
  message: string | null;
  totalTimeMinutes: number;
  score: Score;
  watches: Record<string, Watch>;
  watchOrder: string[];
}

export const plan = createReducer<PlanState, RootAction>({
  fetchState: 'unloaded',
  message: null,
  totalTimeMinutes: 0,
  score: { feasible: false, hard: -1, medium: -1, soft: -1 },
  watches: {},
  watchOrder: [],
})
  .handleAction(actionCreators.asyncFetchPlanActions.request, (state) => ({
    ...state,
    fetchState: 'loading',
    message: null,
  }))
  .handleAction(actionCreators.asyncFetchPlanActions.cancel, (state) => ({
    ...state,
    fetchState: 'unloaded',
    message: null,
  }))
  .handleAction(
    actionCreators.asyncFetchPlanActions.failure,
    (state, { payload: { message } }) => ({
      ...state,
      fetchState: 'error',
      message,
    }),
  )
  .handleAction(
    actionCreators.asyncFetchPlanActions.success,
    (
      state,
      {
        payload: {
          score: {
            feasible,
            hardScore: hard,
            mediumScore: medium,
            softScore: soft,
          },
          totalTime: totalTimeMinutes,
          watchesSummary: watchesList,
        },
      },
    ) => {
      const indexedWatches = watchesList.map(
        ({
          sleepingCharacters,
          watchfulCharacters,
          length: minutesLength,
        }) => ({
          id: uuid(),
          sleepingCharacters,
          watchfulCharacters,
          minutesLength,
        }),
      );
      const { order: watchOrder, entities: watches } = toIndexedRecordAndOrder(
        indexedWatches,
      );
      return {
        ...state,
        fetchState: 'loaded',
        message: null,
        score: { feasible, hard, medium, soft },
        totalTimeMinutes,
        watches,
        watchOrder,
      };
    },
  );
