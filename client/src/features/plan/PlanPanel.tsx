import { type FC } from 'react'
import { TextButton } from '../../common/components/textButton/TextButton'
// import { getMaxTotalTimeSpent } from '../config/getMaxTotalTimeSpent'
// import { getCharacterList } from '../party/getCharacterList'
import { PlanLoader } from './PlanLoader'
import { getFetchStates } from './getFetchStates'
import { PlanError } from './PlanError'
import { PlanResult } from './PlanResult'
import { useAppSelector } from '../../app/store/hooks'

export const PlanPanel: FC = () => {
  // TODO implement plan request using react query
  // const maxTotalTimeSpent = useAppSelector(getMaxTotalTimeSpent)
  // const characters = useAppSelector(getCharacterList)
  // const generateNewPlan = () =>
  //   dispatch(fetchPlanRequest(maxTotalTimeSpent, characters))
  const generateNewPlan = () => { console.log('generateNewPlan not yet implemented') }

  const { isLoading, isErrored, isLoaded } = useAppSelector(getFetchStates)
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <TextButton
          className="text-white bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900"
          loading={isLoading}
          onClick={generateNewPlan}
        >
          Generate Plan
        </TextButton>

        {isLoading && <PlanLoader />}
        {isErrored && <PlanError />}
        {isLoaded && <PlanResult />}
      </div>
    </section>
  )
}
