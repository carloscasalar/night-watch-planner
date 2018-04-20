import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PartyBuilder.less';
import Party from '../../components/Party/Party';
import NightWatchConfig from '../../components/NightWatchConfig/NightWatchConfig';

import addCharacterAction from '../../store/actions/addCharacterAction';
import removeCharacterAction from '../../store/actions/removeCharacterAction';
import increaseCharacterSleepTimeAction from '../../store/actions/increaseCharacterSleepTimeAction';
import updateCharacterNameAction from '../../store/actions/updateCharacterNameAction';
import increaseMaxTotalTimeSpentAction from '../../store/actions/increaseMaxTotalTimeSpentAction';

class PartyBuilder extends Component {
  render() {
    return (
      <div className="PartyBuilder">
        <Party
          party={this.props.party}
          addCharacter={this.props.onCharacterAdded}
          removeCharacter={this.props.onCharacterRemoved}
          updateName={this.props.onCharacterNameUpdated}
          addSleepTimeToCharacter={this.props.onCharacterSleepTimeIncreased}
        />
        <NightWatchConfig
          maxTotalTimeSpent={this.props.maxTotalTimeSpent}
          addTime={this.props.onMaxTotalTimeSpentIncreased}
        />
        <button>Generate Watches</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  onCharacterAdded: name => dispatch(addCharacterAction(name)),
  onCharacterRemoved: characterId => dispatch(removeCharacterAction(characterId)),
  onCharacterSleepTimeIncreased: (characterId, time) =>
    dispatch(increaseCharacterSleepTimeAction(characterId, time)),
  onCharacterNameUpdated: (character, newName) =>
    dispatch(updateCharacterNameAction(character, newName)),
  onMaxTotalTimeSpentIncreased: time => dispatch(increaseMaxTotalTimeSpentAction(time)),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default connectToStore(PartyBuilder);
