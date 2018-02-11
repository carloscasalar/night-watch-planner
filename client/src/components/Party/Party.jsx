import React from 'react';
import './Party.less';

import Character from './Character/Character';

const party = (props) =>(
    <div className="Party">
        {props.characters.map(character => <Character key={character.name} character={character}/>)}
    </div>
);

export default party;