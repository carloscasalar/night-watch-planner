import { StateType } from 'typesafe-actions';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { plan } from '../../features/plan/reducer';

const rootReducer = combineReducers({
  plan,
});
export type RootState = StateType<typeof rootReducer>;

export const rootStore = createStore(rootReducer, composeWithDevTools());
