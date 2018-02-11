import React from 'react';
import './PartyControls.less';

import {species} from 'fantastical';

//TODO move this to a character factory
let num = 0;
const newCharacter = () => {
    num++;
    const characterName = species.human();
    const place = species.angel('female');
    const name = `${characterName} ${place}`;
    const requiredSleepTime = 360;
    return {name, requiredSleepTime};
};

const partyControls = (props) => (
    <div className="PartyControls">
        <button className="addCharacter" title="Add character" onClick={() => props.addCharacter(newCharacter())}>+</button>
    </div>
);

export default partyControls;