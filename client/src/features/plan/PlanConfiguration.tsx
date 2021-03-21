import { FC } from 'react';
import { Icon } from '../../common/components/icon/Icon';

export const PlanConfiguration: FC = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap content-start items-center">
          <Icon name="watchtower" className="w-8 h-8 text-black" />
          <h1 className="text-3xl py-5 ml-3 font-bold title-font">
            Plan Configuration
          </h1>
        </div>
        <div className="flex flex-wrap content-start items-center space-x-2 text-gray-700 text-lg">
          <Icon name="sand-clock" className="w-5 h-5 inline-block" />
          <span>Max time spent:</span>
          <span>10 hours, 30 minutes</span>
          <Icon
            name="add"
            className="w-5 h-5 text-gray-500 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
          />
          <Icon
            name="minus"
            className="w-5 h-5 text-gray-300 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};
