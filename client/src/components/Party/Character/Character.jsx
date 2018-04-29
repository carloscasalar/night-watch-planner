import React from 'react';
import './Character.less';

import EditableName from './EditableName/EditableName';
import TimeControl from '../../TimeControl/TimeControl';

const character = props => (
  <div className="Character">
    <EditableName
      name={props.character.name}
      forbiddenNames={props.forbiddenNames}
      updateName={newName => props.updateName(props.character.id, newName)}
    />
    <TimeControl
      time={props.character.requiredSleepTime}
      addTime={time => props.addSleepTime(props.character.id, time)}
    />
    <div><button onClick={() => props.removeCharacter(props.character.id)}>Remove</button></div>
  </div>
);

export default character;
