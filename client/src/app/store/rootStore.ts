import { StateType } from 'typesafe-actions';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { party } from '../../features/party/reducer';
import { config } from '../../features/config/reducer';
import { createEpicMiddleware } from 'redux-observable';
import { ApplicationAction } from './ApplicationAction';
import { rootEpic } from './epics/rootEpic';
import { plan } from '../../features/plan/reducer';
import { ajax } from 'rxjs/ajax';

const rootReducer = combineReducers({
  party,
  config,
  plan,
});

export type RootState = StateType<typeof rootReducer>;

export interface EpicDependencies {
  request: typeof ajax;
}

const dependencies: EpicDependencies = {
  request: ajax,
};

const epicMiddleware = createEpicMiddleware<
  ApplicationAction,
  ApplicationAction,
  RootState
>({
  dependencies,
});

const composeEnhancers = composeWithDevTools({ trace: true });
const enhancers = composeEnhancers(applyMiddleware(epicMiddleware));
export const rootStore = createStore(rootReducer, {}, enhancers);

epicMiddleware.run(rootEpic);
