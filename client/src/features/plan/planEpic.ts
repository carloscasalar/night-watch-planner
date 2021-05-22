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

const OPTIMIZER_ENDPOINT = 'http://192.168.100.4:3000/v1/optimize';

export const createPlanEpic: Epic<RootAction, PlanAction, RootState> = (
  action$,
  _, // $state
  { ajaxPost }: EpicDependencies,
) =>
  action$.pipe(
    filter(isActionOf(asyncFetchPlanActions.request)),
    mergeMap(({ payload: { url, headers, payload } }) =>
      from(ajaxPost(url, payload, headers)).pipe(
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
