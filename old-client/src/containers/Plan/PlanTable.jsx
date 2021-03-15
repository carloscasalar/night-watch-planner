import React from 'react';
import { connect } from 'react-redux';
import './PlanTable.less';

import { plansType } from '../../store/propTypes';

const minutesToHour = minutes => (minutes / 60).toFixed(1);

const planTable = ({ plans }) => (
  <div className="PlanTable">
    {plans.plan ? (
      <div>
        <div>
        Score:
          {plans.plan.score.hardScore} /
          {plans.plan.score.mediumScore} /
          {plans.plan.score.softScore}
        </div>
        <div>Total time: {minutesToHour(plans.plan.totalTime)} hours</div>
        <div>
        Watches:
          <ul>
            {plans.plan.watches.map(watch => <li key={watch.id}>{minutesToHour(watch.length)} h: {watch.watchfulCharacters.join(', ')}</li>)}
          </ul>
        </div>
      </div>
      ) : null}
  </div>
);

planTable.propTypes = {
  plans: plansType.isRequired,
};

const mapStateToProps = state => ({ ...state });

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = _dispatch => ({ });

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

export default connectToStore(planTable);
