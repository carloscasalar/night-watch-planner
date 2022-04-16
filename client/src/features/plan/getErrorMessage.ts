import { RootState } from 'typesafe-actions';

export const getErrorMessage = (state: RootState): string | null =>
  state.plan.message;
