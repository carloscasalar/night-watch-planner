import React, {Component} from 'react';
import './PartyBuilder.less';
import Party from '../../components/Party/Party';
import PartyControls from '../../components/PartyControls/PartyControls';

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
                <PartyControls/>
            </div>
        );
    }
}

export default PartyBuilder;