import { useMemo } from 'react';
import { RootState } from 'typesafe-actions';
import { DeepPartial } from 'utility-types';
import reduxMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { testRootState } from './testRootState';

export type TestAppWrapperProps = {
  state: DeepPartial<RootState>;
  children: JSX.Element;
};

export const TestAppWrapper = ({
  state = {},
  children,
}: TestAppWrapperProps): JSX.Element => {
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
