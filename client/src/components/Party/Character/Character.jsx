import React from 'react';
import './Character.less';

const character = (props) => {
    const hoursToSleep = (props.character.requiredSleepTime / 60);
    return (
        <div className="Character">
            <div className="name">{props.character.name}</div>
            <div>{hoursToSleep.toFixed(1)} h</div>
            <div><button>Remove</button></div>
        </div>
    );
}

export default character;