import { combineEpics } from 'redux-observable';
import { ApplicationAction } from '../ApplicationAction';
import { RootState } from '../rootStore';
import { createPlanEpic } from '../../../features/plan/planEpic';
import { wrapEpicErrors } from './wrapEpicErrors';

export const rootEpic = combineEpics<
  ApplicationAction,
  ApplicationAction,
  RootState
>(...[createPlanEpic].map(wrapEpicErrors));
