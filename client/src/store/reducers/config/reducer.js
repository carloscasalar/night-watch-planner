import { DEFAULT_MAX_TIME_SPENT } from '../../../domain/NightWatchConfigEntity';
import { MAX_TOTAL_TIME_SPENT_INCREASE } from '../../actions/config/actions';
import increaseMaxTotalTimeSpent from '../increaseMaxTotalTimeSpent';

export const initialState = () => ({
  maxTotalTimeSpent: DEFAULT_MAX_TIME_SPENT,
});

export const configReducer = (state = initialState(), action) => {
  switch (action.type) {
    case MAX_TOTAL_TIME_SPENT_INCREASE:
      return increaseMaxTotalTimeSpent(state, action);
    default:
      return state;
  }
};
