import { createSlice, type PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit'
import { type Score, type Watch } from './schema'
import { toIndexedRecordAndOrder } from '@mappers/toIndexedRecordAndOrder'
import { type PlanEntity } from '@domain/PlanEntity'
import { type PlanError } from '@domain/PlanService'

export type FetchState = 'unloaded' | 'loading' | 'error' | 'loaded'

export interface PlanState {
  message: string | null
  totalTimeMinutes: number
  score: Score
  watches: Record<string, Watch>
  watchOrder: string[]
}

const planSlice = createSlice<PlanState, SliceCaseReducers<PlanState>>({
  name: 'plan',
  initialState: {
    message: null,
    totalTimeMinutes: 0,
    score: { feasible: false, hard: -1, medium: -1, soft: -1 },
    watches: {},
    watchOrder: []
  },
  reducers: {
    setPlan: (state, action: PayloadAction<PlanEntity>) => {
      // TODO use an useCase like in other features to be consistent
      const {
        payload: {
          score: {
            feasible,
            hard,
            medium,
            soft
          },
          totalTimeMinutes,
          watches: watchesList
        }
      } = action
      const { order: watchOrder, entities: watches } = toIndexedRecordAndOrder(
        watchesList
      )
      return {
        ...state,
        message: null,
        score: { feasible, hard, medium, soft },
        totalTimeMinutes,
        watches,
        watchOrder
      }
    },
    setPlanGenerationError: (state, action: PayloadAction<PlanError>) => {
      return {
        ...state,
        message: action.payload.message
      }
    }
  }
})

export const plan = planSlice.reducer
export const { setPlan, setPlanGenerationError } = planSlice.actions
