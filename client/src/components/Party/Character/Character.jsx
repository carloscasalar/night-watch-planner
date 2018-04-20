import React from 'react';
import './Character.less';

import EditableName from './EditableName/EditableName';
import TimeControl from '../../TimeControl/TimeControl';

const character = props => (
  <div className="Character">
    <EditableName
      nameText={props.character.name}
      updateName={newName => props.updateName(props.character, newName)}
    />
    <TimeControl
      time={props.character.requiredSleepTime}
      addTime={time => props.addSleepTime(props.character.id, time)}
    />
    <div><button onClick={() => props.removeCharacter(props.character)}>Remove</button></div>
  </div>
);

export default character;
