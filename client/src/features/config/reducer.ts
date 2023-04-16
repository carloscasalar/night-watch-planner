import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { NightWatchConfigStateRepository } from './NightWatchConfigStateRepository'
import { IncreaseMaxTotalTimeSpent } from '../../usecases/IncreaseMaxTotalTimeSpent'

const TWELVE_HOURS_IN_MINUTES = 12 * 60

export interface NightWatchConfigState {
  maxTotalTimeSpent: number
}

const configSlice = createSlice({
  name: 'config',
  initialState: {
    maxTotalTimeSpent: TWELVE_HOURS_IN_MINUTES
  },
  reducers: {
    increaseMaxTotalTimeSpentTimeAction: (state, { payload: timeIncrement }: PayloadAction<number>) => {
      const repository = new NightWatchConfigStateRepository(state)
      const useCase = new IncreaseMaxTotalTimeSpent(repository)

      useCase.execute(timeIncrement)

      return repository.state
    }
  }
})

export const config = configSlice.reducer
export const { increaseMaxTotalTimeSpentTimeAction } = configSlice.actions
