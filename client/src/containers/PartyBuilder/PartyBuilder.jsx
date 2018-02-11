import React, {Component} from 'react';
import './PartyBuilder.less';
import Party from '../../components/Party/Party';
import NightWatchConfig from '../../components/NightWatchConfig/NightWatchConfig';

class PartyBuilder extends Component{
    state = {
        party: [
            {name: 'Gimli', requiredSleepTime: 480},
            {name: 'Boromir', requiredSleepTime: 480},
            {name: 'Legolas', requiredSleepTime: 240}
        ]
    };

    render(){
        return (
            <div className="PartyBuilder">
                <Party characters={this.state.party}/>
                <NightWatchConfig />
                <button>Generate Watches</button>
            </div>
        );
    }
}

export default PartyBuilder;