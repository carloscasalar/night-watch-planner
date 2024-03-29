import { createSelector } from 'reselect'
import { type RootState } from '../../app/store/rootStore'
import { toHourMinutes } from '../../common/format/toHourMinutes'

export const getFormattedMaxTotalTimeSpent = createSelector(
  (state: RootState) => state.config.maxTotalTimeSpent,
  (time) => toHourMinutes(time)
)
