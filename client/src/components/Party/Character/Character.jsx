import React from 'react';
import './Character.less';

import EditableName from './EditableName/EditableName';
import TimeControl from '../../TimeControl/TimeControl';

const character = (props) => {
    return (
        <div className="Character">
            <EditableName nameText={props.character.name} />
            <TimeControl
                time={props.character.requiredSleepTime}
                addTime={(time) => props.addSleepTime(props.character.name, time)}
            />
            <div><button>Remove</button></div>
        </div>
    );
};

export default character;