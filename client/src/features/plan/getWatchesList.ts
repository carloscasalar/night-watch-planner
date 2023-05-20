import { type RootState } from '@app/store/rootStore'
// Selector that retrieves the list of watches Ids from the store
export const getWatchesList = (state: RootState) => state.plan.watchOrder
