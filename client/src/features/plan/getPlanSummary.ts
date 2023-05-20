import { type RootState } from '@app/store/rootStore'
import { toHourMinutesList } from '@format/toHourMinutesList'

// Selector that retrieves the list of watches Ids from the store
export const getPlanSummary = (state: RootState) => [
  state.plan.watchOrder,
  toHourMinutesList(state.plan.totalTimeMinutes)
]
