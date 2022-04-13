import { ActionsObservable, Epic, StateObservable } from 'redux-observable';
import { merge, of as ofObservable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RootAction, RootState } from 'typesafe-actions';

export const wrapEpicErrors = (epic: Epic) => (
  action$: ActionsObservable<RootAction>,
  state$: StateObservable<RootState>,
  dependencies: unknown,
) =>
  epic(action$, state$, dependencies).pipe(
    catchError((error, source) =>
      // eslint-disable-next-line no-console
      merge(
        source,
        ofObservable(
          console.error(
            `error thrown from an epic: ${error.toString()}`,
            error.stack,
          ),
        ),
      ),
    ),
  );
