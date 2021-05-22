import React from 'react';
import PropTypes from 'prop-types';
import { characterType, forbiddenNamesType } from '../../../store/propTypes';
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

character.propTypes = {
  character: characterType.isRequired,
  forbiddenNames: forbiddenNamesType.isRequired,
  updateName: PropTypes.func.isRequired,
  addSleepTime: PropTypes.func.isRequired,
  removeCharacter: PropTypes.func.isRequired,
};

export default character;
