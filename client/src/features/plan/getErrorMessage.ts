import { type RootState } from '../../app/store/rootStore'

export const getErrorMessage = (state: RootState): string | null =>
  state.plan.message
