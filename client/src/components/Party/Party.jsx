import React from 'react';
import './Party.less';

import PartyHeader from './PartyHeader/PartyHeader';
import Character from './Character/Character';
import PartyControls from './PartyControls/PartyControls';

const party = (props) => {
  const { party: { characters, isEmpty, names: forbiddenNames } } = props;
  const { addSleepTimeToCharacter, addCharacter } = props;

  const forbiddenNamesForCharacter = ({ name }) => forbiddenNames.filter(it => it !== name);

  const noCharacterMessage = (
    <div className="noCharacterMessage">
            Push the add button (+) to add a character
    </div>
  );

  return (
    <div className="Party">
      <div className="members">
        <PartyHeader />
        {isEmpty ? noCharacterMessage : null }
        {characters.map(character =>
          (<Character
            key={character.id}
            character={character}
            forbiddenNames={forbiddenNamesForCharacter(character)}
            addSleepTime={addSleepTimeToCharacter}
            updateName={(characterId, newName) => props.updateName(characterId, newName)}
            removeCharacter={characterId => props.removeCharacter(characterId)}
          />))}
      </div>

      <PartyControls forbiddenNames={forbiddenNames} addCharacter={addCharacter} />
    </div>
  );
};

export default party;
