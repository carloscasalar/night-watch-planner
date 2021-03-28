import { FC } from 'react';
import { Icon } from '../../common/components/icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { getFormattedMaxTotalTimeSpent } from './getFormattedMaxTotalTimeSpent';
import { increaseCharacterRequiredSleepTime } from './increaseMaxTotalTimeSpentAction';

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
        <div className="flex flex-wrap content-start items-center">
          <h1 className="text-3xl py-5 font-bold title-font">
            Plan Configuration
          </h1>
        </div>
        <div className="flex flex-wrap content-start items-center space-x-2 text-gray-700 text-lg">
          <Icon name="sand-clock" className="w-5 h-5 inline-block" />
          <span>Max time spent:</span>
          <span>{maxTimeSpent}</span>
          <div onClick={increaseTime}>
            <Icon
              name="add"
              className="w-5 h-5 text-gray-500 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
            />
          </div>
          <div onClick={decreaseTime}>
            <Icon
              name="minus"
              className="w-5 h-5 text-gray-300 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
