import { Epic } from 'redux-observable';
import { isActionOf, RootAction, RootState } from 'typesafe-actions';
import { catchError, filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import {
  asyncFetchPlanActions,
  PlanResponsePayload,
} from './actions/asyncFetchPlanActions';
import { from, of } from 'rxjs';
import { PlanAction } from './actions/PlanAction';
import { EpicDependencies } from '../../app/store/rootStore';

// const OPTIMIZER_ENDPOINT = 'http://localhost:3000/v1/optimize';

export const createPlanEpic: Epic<RootAction, PlanAction, RootState> = (
  action$,
  _, // $state
  { request }: EpicDependencies,
) =>
  action$.pipe(
    filter(isActionOf(asyncFetchPlanActions.request)),
    mergeMap(({ payload: { url, method, headers, payload: body } }) =>
      from(request({ url, method, headers, body })).pipe(
        map(({ response }) =>
          asyncFetchPlanActions.success(response as PlanResponsePayload),
        ),
        catchError((message: string) =>
          of(asyncFetchPlanActions.failure({ message })),
        ),
        takeUntil(
          action$.pipe(filter(isActionOf(asyncFetchPlanActions.cancel))),
        ),
      ),
    ),
  );
