import { FC } from 'react';
import { TextButton } from '../../common/components/textButton/TextButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanRequest } from './actions/asyncFetchPlanActions';
import { getMaxTotalTimeSpent } from '../config/getMaxTotalTimeSpent';
import { getCharacterList } from '../party/getCharacterList';
import { PlanLoader } from './PlanLoader';
import { getFetchStates } from './getFetchStates';
import { PlanError } from './PlanError';
import { PlanResult } from './PlanResult';

export const PlanPanel: FC = () => {
  const dispatch = useDispatch();

  const maxTotalTimeSpent = useSelector(getMaxTotalTimeSpent);
  const characters = useSelector(getCharacterList);
  const generateNewPlan = () =>
    dispatch(fetchPlanRequest(maxTotalTimeSpent, characters));

  const { isLoading, isErrored, isLoaded } = useSelector(getFetchStates);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <TextButton
          className="bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900 text-white"
          loading={isLoading}
          onClick={generateNewPlan}
        >
          Generate Plan
        </TextButton>
      </div>
      {isLoading && <PlanLoader />}
      {isErrored && <PlanError />}
      {isLoaded && <PlanResult />}
    </section>
  );
};
