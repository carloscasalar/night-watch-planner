import React, {Component} from 'react';
import {connect} from 'react-redux';
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
                    characters={this.props.party}
                    addCharacter={this.props.onCharacterAdded}
                    removeCharacter={this.props.onRemoveCharacter}
                    updateName={this.props.onCharacterNameUpdated}
                    addSleepTimeToCharacter={this.props.onSleepTimeToCharacterAdded}
                />
                <NightWatchConfig
                    maxTotalTimeSpent={this.props.maxTotalTimeSpent}
                    addTime={this.props.onMaxTotalTimeSpentAdded}
                />
                <button>Generate Watches</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
    onCharacterAdded: (name) => dispatch(addCharacterAction(name)),
    onRemoveCharacter: (character) => dispatch(removeCharacterAction(character)),
    onSleepTimeToCharacterAdded: (characterName, time) =>
        dispatch(increaseCharacterSleepTimeAction(characterName, time)),
    onCharacterNameUpdated: (character, newName) => dispatch(updateCharacterNameAction(character, newName)),
    onMaxTotalTimeSpentAdded: (time) => dispatch(increaseMaxTotalTimeSpentAction(time))
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default connectToStore(PartyBuilder);