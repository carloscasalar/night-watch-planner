import React, {Component} from 'react';
import './PartyBuilder.less';
import Party from '../../components/Party/Party';
import NightWatchConfig from '../../components/NightWatchConfig/NightWatchConfig';

class PartyBuilder extends Component {
    state = {
        party: [],
        maxTotalTimeSpent: 720
    };

    addTimeToMaxTotalTimeSpentHandler = (timeToAdd) => {
        this.setState((previousState) => ({
            maxTotalTimeSpent: previousState.maxTotalTimeSpent + timeToAdd
        }));
    };

    render() {
        return (
            <div className="PartyBuilder">
                <Party characters={this.state.party}/>
                <NightWatchConfig
                    maxTotalTimeSpent={this.state.maxTotalTimeSpent}
                    addTime={(timeToAdd) => this.addTimeToMaxTotalTimeSpentHandler(timeToAdd)}
                />
                <button>Generate Watches</button>
            </div>
        );
    }
}

export default PartyBuilder;