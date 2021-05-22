import React from 'react';
import PropTypes from 'prop-types';
import { charactersType } from '../../store/propTypes';
import Spinner from '../Spinner/Spinner';

const requestPlanButton = props => (
  <div className="RequestPlanButton">
    {props.waitingForPlan ? <Spinner /> :
    <button
      onClick={() => props.onRequestNightWatchPlan({
          maxTotalTimeSpent: props.maxTotalTimeSpent,
          characters: props.characters,
        })}
    >
      Generate Watches
    </button>
    }
  </div>
);

requestPlanButton.propTypes = {
  waitingForPlan: PropTypes.bool.isRequired,
  characters: charactersType.isRequired,
  maxTotalTimeSpent: PropTypes.number.isRequired,
  onRequestNightWatchPlan: PropTypes.func.isRequired,
};

export default requestPlanButton;
