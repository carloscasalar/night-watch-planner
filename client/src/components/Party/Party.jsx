import React from 'react';
import './Party.less';

import PartyHeader from './PartyHeader/PartyHeader';
import Character from './Character/Character';
import PartyControls from './PartyControls/PartyControls';

const party = (props) => {

    const noCharacterMessage = (
        <div className="noCharacterMessage">
            Push the add button (+) to add a character
        </div>
    );

    return (
        <div className="Party">
            <PartyHeader />
            {props.party.isEmpty? noCharacterMessage : null }
            {props.party.characters.map(character =>
                <Character
                    key={character.id}
                    character={character}
                    addSleepTime={props.addSleepTimeToCharacter}
                    updateName={(character, newName) => props.updateName(character, newName)}
                    removeCharacter={(character) => props.removeCharacter(character)}
                />
            )}

            <PartyControls addCharacter={props.addCharacter}/>
        </div>
    );
};

export default party;
