import { StateType } from 'typesafe-actions';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { plan } from '../../features/plan/reducer';
import { party } from '../../features/party/reducer';

const rootReducer = combineReducers({
  party,
  plan,
});
export type RootState = StateType<typeof rootReducer>;

export const rootStore = createStore(rootReducer, composeWithDevTools());
