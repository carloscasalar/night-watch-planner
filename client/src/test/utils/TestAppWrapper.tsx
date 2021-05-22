import { PropsWithChildren, useMemo } from 'react';
import { RootState } from 'typesafe-actions';
import { DeepPartial } from 'utility-types';
import reduxMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { testRootState } from './testRootState';

export type TestAppWrapperProps = PropsWithChildren<{
  state: DeepPartial<RootState>;
}>;

export const TestAppWrapper = ({
  state = {},
  children,
}: TestAppWrapperProps) => {
  const store = useMemo<RootState>(
    () =>
      reduxMockStore<RootState>()({
        ...testRootState,
        ...state,
      }),
    [state],
  );

  return <Provider store={store}>{children}</Provider>;
};
