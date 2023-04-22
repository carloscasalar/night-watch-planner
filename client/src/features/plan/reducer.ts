import { createSlice, type PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit'
import { type Score, type Watch } from './schema'
import { toIndexedRecordAndOrder } from '../../common/mappers/toIndexedRecordAndOrder'

export type FetchState = 'unloaded' | 'loading' | 'error' | 'loaded'

export interface Plan {
  score: {
    feasible: boolean
    hard: number
    medium: number
    soft: number
  }
  totalTimeMinutes: number
  watches: Watch[]
}

export interface PlanState {
  fetchState: FetchState
  message: string | null
  totalTimeMinutes: number
  score: Score
  watches: Record<string, Watch>
  watchOrder: string[]
}

interface RemoteWatch {
  sleepingCharacters: string[]
  watchfulCharacters: string[]
  length: number
}
interface RemotePlanPayload {
  score: {
    feasible: boolean
    hardScore: number
    mediumScore: number
    softScore: number
  }
  totalTime: number
  watchesSummary: RemoteWatch[]
}

const planSlice = createSlice<PlanState, SliceCaseReducers<PlanState>>({
  name: 'plan',
  initialState: {
    fetchState: 'unloaded',
    message: null,
    totalTimeMinutes: 0,
    score: { feasible: false, hard: -1, medium: -1, soft: -1 },
    watches: {},
    watchOrder: []
  },
  reducers: {
    setPlanFromRemoteAction: (state, action: PayloadAction<RemotePlanPayload>) => {
      // TODO use an useCase like in other features to be consistent
      const {
        payload: {
          score: {
            feasible,
            hardScore: hard,
            mediumScore: medium,
            softScore: soft
          },
          totalTime: totalTimeMinutes,
          watchesSummary: watchesList
        }
      } = action
      const indexedWatches = watchesList.map(
        ({
          sleepingCharacters,
          watchfulCharacters,
          length: minutesLength
        }) => ({
          id: crypto.randomUUID(),
          sleepingCharacters,
          watchfulCharacters,
          minutesLength
        })
      )
      const { order: watchOrder, entities: watches } = toIndexedRecordAndOrder(
        indexedWatches
      )
      return {
        ...state,
        fetchState: 'loaded',
        message: null,
        score: { feasible, hard, medium, soft },
        totalTimeMinutes,
        watches,
        watchOrder
      }
    }
  }
})

export const plan = planSlice.reducer
export const { setPlanFromRemoteAction } = planSlice.actions
