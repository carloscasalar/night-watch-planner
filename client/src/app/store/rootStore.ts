import { StateType } from 'typesafe-actions';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { party } from '../../features/party/reducer';
import { config } from '../../features/config/reducer';

const rootReducer = combineReducers({
  party,
  config,
});
export type RootState = StateType<typeof rootReducer>;

export const rootStore = createStore(rootReducer, composeWithDevTools());
