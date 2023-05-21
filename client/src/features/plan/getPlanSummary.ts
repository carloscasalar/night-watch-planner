import { toFixedDigits } from '@/common/format/toFixedDigits'
import { type RootState } from '@app/store/rootStore'
import { toHourMinutesList } from '@format/toHourMinutesList'

// Selector that retrieves the list of watches Ids from the store
export const getPlanSummary = (state: RootState) => {
  const duration = toHourMinutesList(state.plan.totalTimeMinutes).map(time => toFixedDigits(time, 2))
  const watchIds = [...state.plan.watchOrder]
  return { watchIds, duration }
}
