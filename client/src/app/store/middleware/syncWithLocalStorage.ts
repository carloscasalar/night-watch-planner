import { type Middleware } from '@reduxjs/toolkit'

export const LOCAL_STORAGE_REDUX_KEY = '__nwp_redux_state__'

export const syncWithLocalStorage: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage?.setItem(LOCAL_STORAGE_REDUX_KEY, JSON.stringify(store.getState()))
}
