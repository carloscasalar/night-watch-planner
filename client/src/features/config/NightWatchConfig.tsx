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
        <h1 className="text-3xl py-5 font-bold title-font">
          Plan Configuration
        </h1>
        <h2 className="title-font font-medium text-xl px-3">Max time spent</h2>
        <div className="flex">
          <Icon name="sand-clock" className="w-16 h-16" />
          <div className="flex flex-col">
            <span className="text-xl">{maxTimeSpent}</span>
            <div className="flex">
              <div className="p-1" onClick={increaseTime}>
                <Icon
                  name="add"
                  className="w-8 h-8 text-gray-500 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
                />
              </div>
              <div className="p-1" onClick={decreaseTime}>
                <Icon
                  name="minus"
                  className="w-8 h-8 text-gray-300 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
