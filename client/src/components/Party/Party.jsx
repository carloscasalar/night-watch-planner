import React from 'react';
import './Party.less';

import Character from './Character/Character';
import PartyControls from './PartyControls/PartyControls';

const party = (props) =>(
    <div className="Party">
        {props.characters.map(character => <Character key={character.name} character={character}/>)}

        <PartyControls/>
    </div>
);

export default party;