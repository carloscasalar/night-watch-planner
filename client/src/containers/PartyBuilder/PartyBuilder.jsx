import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PartyBuilder.less';
import Party from '../../components/Party/Party';
import NightWatchConfig from '../../components/NightWatchConfig/NightWatchConfig';

import * as actionTypes from '../../store/actions';

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
    onCharacterAdded: (name) => dispatch({
        type: actionTypes.ADD_CHARACTER,
        name
    }),
    onRemoveCharacter: (character) => dispatch({
        type: actionTypes.REMOVE_CHARACTER,
        character
    }),
    onSleepTimeToCharacterAdded: (characterName, time) => dispatch({
        type: actionTypes.ADD_SLEEP_TIME_TO_CHARACTER,
        characterName,
        time
    }),
    onCharacterNameUpdated: (character, newName) => dispatch({
        type: actionTypes.UPDATE_CHARACTER_NAME,
        character,
        newName
    }),
    onMaxTotalTimeSpentAdded: (time) => dispatch({
        type: actionTypes.ADD_TIME_TO_MAX_TOTAL_TIME_SPENT,
        time
    })
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default connectToStore(PartyBuilder);