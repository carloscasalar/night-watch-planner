import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './PartyBuilder.less';
import Party from '../../components/Party/Party';
import NightWatchConfig from '../../components/NightWatchConfig/NightWatchConfig';
import RequestPlanButton from '../../components/RequestPlanButton/RequestPlanButton';

import addCharacterAction from '../../store/actions/addCharacterAction';
import removeCharacterAction from '../../store/actions/removeCharacterAction';
import increaseCharacterSleepTimeAction from '../../store/actions/increaseCharacterSleepTimeAction';
import updateCharacterNameAction from '../../store/actions/updateCharacterNameAction';
import increaseMaxTotalTimeSpentAction from '../../store/actions/config/increaseMaxTotalTimeSpentAction';
import { configType, partyType, uiType } from '../../store/propTypes';
import requestNightWatchPlan from '../../store/actions/requestNightWatchPlan';

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
      maxTotalTimeSpent={props.config.maxTotalTimeSpent}
      addTime={props.onMaxTotalTimeSpentIncreased}
    />
    <RequestPlanButton
      characters={props.party.characters}
      maxTotalTimeSpent={props.config.maxTotalTimeSpent}
      waitingForPlan={props.ui.waitingForPlan}
      onRequestNightWatchPlan={props.onRequestNightWatchPlan}
    />
  </div>
);

partyBuilder.propTypes = {
  party: partyType.isRequired,
  config: configType.isRequired,
  ui: uiType.isRequired,
  onCharacterAdded: PropTypes.func.isRequired,
  onCharacterRemoved: PropTypes.func.isRequired,
  onCharacterNameUpdated: PropTypes.func.isRequired,
  onCharacterSleepTimeIncreased: PropTypes.func.isRequired,
  onMaxTotalTimeSpentIncreased: PropTypes.func.isRequired,
  onRequestNightWatchPlan: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  onCharacterAdded: name => dispatch(addCharacterAction(name)),
  onCharacterRemoved: characterId => dispatch(removeCharacterAction(characterId)),
  onCharacterSleepTimeIncreased: (characterId, time) =>
    dispatch(increaseCharacterSleepTimeAction(characterId, time)),
  onCharacterNameUpdated: (characterId, newName) =>
    dispatch(updateCharacterNameAction(characterId, newName)),
  onMaxTotalTimeSpentIncreased: time => dispatch(increaseMaxTotalTimeSpentAction(time)),
  onRequestNightWatchPlan: planRequest => dispatch(requestNightWatchPlan(planRequest)),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default connectToStore(partyBuilder);
