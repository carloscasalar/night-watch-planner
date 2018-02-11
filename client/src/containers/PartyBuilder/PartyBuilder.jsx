import React, {Component} from 'react';
import './PartyBuilder.less';
import Party from '../../components/Party/Party';
import NightWatchConfig from '../../components/NightWatchConfig/NightWatchConfig';

class PartyBuilder extends Component {
    state = {
        party: [],
        maxTotalTimeSpent: 720
    };

    addCharacterHandler = (character) => {
        this.setState((previousState) => ({
            party: [...previousState.party, character]
        }));
    };

    addSleepTimeToCharacterHandler = (characterName, time) => {
        this.setState((previousState) => {
            const party = [...previousState.party];
            const characterIndex = party.findIndex(({name}) => name === characterName);
            const character = {...party[characterIndex]};

            character.requiredSleepTime = character.requiredSleepTime + time;
            party[characterIndex] = character;
            return {party};
        });
    };

    addTimeToMaxTotalTimeSpentHandler = (timeToAdd) => {
        this.setState((previousState) => ({
            maxTotalTimeSpent: previousState.maxTotalTimeSpent + timeToAdd
        }));
    };

    render() {
        return (
            <div className="PartyBuilder">
                <Party
                    characters={this.state.party}
                    addCharacter={this.addCharacterHandler}
                    addSleepTimeToCharacter={this.addSleepTimeToCharacterHandler}
                />
                <NightWatchConfig
                    maxTotalTimeSpent={this.state.maxTotalTimeSpent}
                    addTime={this.addTimeToMaxTotalTimeSpentHandler}
                />
                <button>Generate Watches</button>
            </div>
        );
    }
}

export default PartyBuilder;