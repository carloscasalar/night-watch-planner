import React from 'react';
import './TimeControl.less';

const timeControl = (props) =>{
    const time = props.time || 0;
    const timeInHours = (time / 60).toFixed(1);
    return (
        <div className="TimeControl">
            <span>{timeInHours} h</span>
            <button>+</button>
            <button>-</button>
        </div>
    );
};

export default timeControl;