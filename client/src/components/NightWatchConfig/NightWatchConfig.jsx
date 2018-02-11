import React from 'react';
import './NightWatchConfig.less';

import TimeControl from '../TimeControl/TimeControl';

const nightWatchConfig = (props) => (
    <div className="NightWatchConfig">
        Max total time spent in watches:
        <TimeControl time={720} />
    </div>
);

export default nightWatchConfig;