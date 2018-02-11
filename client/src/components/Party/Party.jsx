import React from 'react';
import './Party.less';

import Character from './Character/Character';
import PartyControls from './PartyControls/PartyControls';

const party = (props) => (
    <div className="Party">
        {props.characters.map(character =>
            <Character
                key={character.name}
                character={character}
                addSleepTime={props.addSleepTimeToCharacter}
            />
        )}

        <PartyControls addCharacter={props.addCharacter}/>
    </div>
);

export default party;