import { type PreloadedState, configureStore } from '@reduxjs/toolkit'
import { config } from '@features/config/reducer'
import { party } from '@features/party/reducer'
import { plan } from '@features/plan/reducer'
import { syncWithLocalStorage } from './middleware/syncWithLocalStorage'

const reducer = {
  config,
  party,
  plan
}
export const rootStore = configureStore({
  reducer,
  middleware: [syncWithLocalStorage]
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch
export type AppStore = ReturnType<typeof setupStore>
