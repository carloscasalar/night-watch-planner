import React from 'react';
import PropTypes from 'prop-types';
import './NightWatchConfig.less';

import TimeControl from '../TimeControl/TimeControl';

const nightWatchConfig = props => (
  <div className="NightWatchConfig">
    Max total time spent in watches:
    <TimeControl time={props.maxTotalTimeSpent} addTime={props.addTime} />
  </div>
);

nightWatchConfig.propTypes = {
  maxTotalTimeSpent: PropTypes.number.isRequired,
  addTime: PropTypes.func.isRequired,
};

export default nightWatchConfig;
