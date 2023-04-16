import { useMemo } from 'react'
import { Provider } from 'react-redux'

import { setupStore, type RootState } from '../app/store/rootStore'
import { testRootState } from './testRootState'

export interface TestAppWrapperProps {
  state: RootState
  children: JSX.Element
}

export const TestAppWrapper = ({
  state = { ...testRootState },
  children
}: TestAppWrapperProps): JSX.Element => {
  const store = useMemo(
    () => setupStore(state),
    [state]
  )

  return <Provider store={store}>{children}</Provider>
}
