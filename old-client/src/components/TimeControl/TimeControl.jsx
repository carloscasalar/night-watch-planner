import React from 'react';
import PropTypes from 'prop-types';
import './TimeControl.less';

const HALF_HOUR = 30;

const timeControl = (props) => {
  const time = props.time || 0;
  const timeInHours = (time / 60).toFixed(1);
  return (
    <div className="TimeControl">
      <span>{timeInHours} h</span>
      <button onClick={() => props.addTime(HALF_HOUR)}>+</button>
      <button onClick={() => props.addTime(-HALF_HOUR)}>-</button>
    </div>
  );
};

timeControl.propTypes = {
  time: PropTypes.number.isRequired,
  addTime: PropTypes.func.isRequired,
};

export default timeControl;
