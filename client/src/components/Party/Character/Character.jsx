import React from 'react';
import './Character.less';

import TimeControl from '../../TimeControl/TimeControl';

const character = (props) => {
    return (
        <div className="Character">
            <div className="name">{props.character.name}</div>
            <TimeControl time={props.character.requiredSleepTime} />
            <div><button>Remove</button></div>
        </div>
    );
};

export default character;