import axios from 'axios';
import addNightWatchPlanAction from './addNightWatchPlanAction';
import fetchNightWatchPlanFailedAction from './fetchNightWatchPlanFailedAction';
import switchOffLoadingPlanAction from './ui/switchOffLoadingPlanAction';
import switchOnLoadingPlanAction from './ui/switchOnLoadingPlanAction';

const requestNightWatchPlan = ({ maxTotalTimeSpent, characters }) => (dispatch) => {
  dispatch(switchOnLoadingPlanAction());
  return axios
    .post('http://localhost:3000/v1/optimize', { maxTotalTimeSpent, party: characters })
    .then(({ data: nightWatchPlan }) => {
      dispatch(switchOffLoadingPlanAction());
      dispatch(addNightWatchPlanAction(nightWatchPlan));
    })
    .catch((error) => {
      dispatch(switchOffLoadingPlanAction());
      dispatch(fetchNightWatchPlanFailedAction(error));
    });
};

export default requestNightWatchPlan;
