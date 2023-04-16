import { type RootState } from '../../app/store/rootStore'

export interface FetchStates {
  isErrored: boolean
  isLoaded: boolean
  isLoading: boolean
  isUnloaded: boolean
}

export const getFetchStates = ({
  plan: { fetchState }
}: RootState): FetchStates => ({
  isErrored: fetchState === 'error',
  isLoaded: fetchState === 'loaded',
  isLoading: fetchState === 'loading',
  isUnloaded: fetchState === 'unloaded'
})
