import { combineReducers } from 'redux';
import { partyReducer } from './reducers/party/reducer';
import { configReducer } from './reducers/config/reducer';
import { uiReducer } from './reducers/ui/reducer';
import { plansReducer } from './reducers/plans/reducer';

const reducer = combineReducers({
  party: partyReducer,
  config: configReducer,
  ui: uiReducer,
  plans: plansReducer,
});

export default reducer;
