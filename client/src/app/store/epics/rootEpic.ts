import { combineEpics } from 'redux-observable';
import { ApplicationAction } from '../ApplicationAction';
import { RootState } from '../rootStore';

export const rootEpic = combineEpics<
  ApplicationAction,
  ApplicationAction,
  RootState
>();
