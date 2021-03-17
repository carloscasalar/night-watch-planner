import { StateType } from 'typesafe-actions';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ui } from '../../features/ui/reducer';

const rootReducer = combineReducers({
  ui,
});
export type RootState = StateType<typeof rootReducer>;

export const rootStore = createStore(rootReducer, composeWithDevTools());
