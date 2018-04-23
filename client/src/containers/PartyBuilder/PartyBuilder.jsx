import React from 'react';
import { connect } from 'react-redux';
import './PartyBuilder.less';
import Party from '../../components/Party/Party';
import NightWatchConfig from '../../components/NightWatchConfig/NightWatchConfig';

import addCharacterAction from '../../store/actions/addCharacterAction';
import removeCharacterAction from '../../store/actions/removeCharacterAction';
import increaseCharacterSleepTimeAction from '../../store/actions/increaseCharacterSleepTimeAction';
import updateCharacterNameAction from '../../store/actions/updateCharacterNameAction';
import increaseMaxTotalTimeSpentAction from '../../store/actions/increaseMaxTotalTimeSpentAction';

const partyBuilder = props => (
  <div className="PartyBuilder">
    <Party
      party={props.party}
      addCharacter={props.onCharacterAdded}
      removeCharacter={props.onCharacterRemoved}
      updateName={props.onCharacterNameUpdated}
      addSleepTimeToCharacter={props.onCharacterSleepTimeIncreased}
    />
    <NightWatchConfig
      maxTotalTimeSpent={props.maxTotalTimeSpent}
      addTime={props.onMaxTotalTimeSpentIncreased}
    />
    <button>Generate Watches</button>
  </div>
);

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  onCharacterAdded: name => dispatch(addCharacterAction(name)),
  onCharacterRemoved: characterId => dispatch(removeCharacterAction(characterId)),
  onCharacterSleepTimeIncreased: (characterId, time) =>
    dispatch(increaseCharacterSleepTimeAction(characterId, time)),
  onCharacterNameUpdated: (characterId, newName) =>
    dispatch(updateCharacterNameAction(characterId, newName)),
  onMaxTotalTimeSpentIncreased: time => dispatch(increaseMaxTotalTimeSpentAction(time)),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default connectToStore(partyBuilder);
