import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFormattedMaxTotalTimeSpent } from './getFormattedMaxTotalTimeSpent';
import { increaseCharacterRequiredSleepTime } from './increaseMaxTotalTimeSpentAction';
import { TimeCounter } from '../../common/components/timeCounter/TimeCounter';

const MINUTES_INCREMENT = 30;

export const NightWatchConfig: FC = () => {
  const maxTimeSpent = useSelector(getFormattedMaxTotalTimeSpent);
  const dispatch = useDispatch();
  const increaseTime = () =>
    dispatch(increaseCharacterRequiredSleepTime(MINUTES_INCREMENT));
  const decreaseTime = () =>
    dispatch(increaseCharacterRequiredSleepTime(-MINUTES_INCREMENT));
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <h1 className="text-3xl py-5 font-bold title-font">
          Plan Configuration
        </h1>
        <TimeCounter
          icon="sand-clock"
          size="big"
          label="Max time spent"
          value={maxTimeSpent}
          increase={increaseTime}
          decrease={decreaseTime}
        />
      </div>
    </section>
  );
};
