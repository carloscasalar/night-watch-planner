import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { IncreaseMaxTotalTimeSpent } from '@usecases/IncreaseMaxTotalTimeSpent'
import { LOCAL_STORAGE_REDUX_KEY } from '@/app/store/middleware/syncWithLocalStorage'
import { NightWatchConfigStateRepository } from './NightWatchConfigStateRepository'

const TWELVE_HOURS_IN_MINUTES = 12 * 60

export interface NightWatchConfigState {
  maxTotalTimeSpent: number
}

const initialState: NightWatchConfigState = (() => {
  const defaultConfig: NightWatchConfigState = {
    maxTotalTimeSpent: TWELVE_HOURS_IN_MINUTES
  }
  const persistedState = localStorage.getItem(LOCAL_STORAGE_REDUX_KEY)
  return persistedState ? JSON.parse(persistedState).config : defaultConfig
})()

const configSlice = createSlice({
  name: 'config',
  initialState,
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
