import { ActionsObservable, Epic, StateObservable } from 'redux-observable';
import { merge, Observable, of as ofObservable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RootAction, RootState } from 'typesafe-actions';
import { ApplicationAction } from '../ApplicationAction';

export const wrapEpicErrors = (epic: Epic) => (
  action$: ActionsObservable<RootAction>,
  state$: StateObservable<RootState>,
  dependencies: unknown,
): Observable<ApplicationAction> =>
  epic(action$, state$, dependencies).pipe(
    catchError((error, source) =>
      merge(
        source,
        ofObservable(
          // eslint-disable-next-line no-console
          console.error(
            `error thrown from an epic: ${error.toString()}`,
            error.stack,
          ),
        ),
      ),
    ),
  ) as Observable<ApplicationAction>;
