import axios from 'axios';
import addNightWatchPlanAction from './addNightWatchPlanAction';
import fetchNightWatchPlanFailedAction from './fetchNightWatchPlanFailedAction';

const requestNightWatchPlan = ({ maxTotalTimeSpent, characters }) => dispatch => axios
  .post('http://localhost:3000/v1/optimize', { maxTotalTimeSpent, party: characters })
  .then(({ data: nightWatchPlan }) => dispatch(addNightWatchPlanAction(nightWatchPlan)))
  .catch(error => dispatch(fetchNightWatchPlanFailedAction(error)));

export default requestNightWatchPlan;
