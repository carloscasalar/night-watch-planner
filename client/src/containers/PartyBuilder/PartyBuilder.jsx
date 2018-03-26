import React, {Component} from 'react';
import './PartyBuilder.less';
import Party from '../../components/Party/Party';
import NightWatchConfig from '../../components/NightWatchConfig/NightWatchConfig';

const DEFAULT_SLEEP_TIME = 6 * 60;

class PartyBuilder extends Component {
    state = {
        party: [],
        maxTotalTimeSpent: 720,
        characterCounter: 0
    };

    newCharacter = (name, id) => ({
        id,
        name,
        requiredSleepTime: DEFAULT_SLEEP_TIME
    });

    addCharacterHandler = (characterName) => {
        this.setState((previousState) => {
            const characterCounter = previousState.characterCounter + 1;
            return {
                party: [...previousState.party, this.newCharacter(characterName, characterCounter)],
                characterCounter
            }
        });
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

    updateNameHandler = ({id: characterId}, newName) => {
        this.setState((previousState) => {
            const party = [...previousState.party];
            const characterIndex = party.findIndex(({id}) => id === characterId);
            const character = {...party[characterIndex]};

            character.name = newName;
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
                    updateName={this.updateNameHandler}
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