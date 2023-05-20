import { type FC } from 'react'
import { TextButton } from '@components/textButton/TextButton'
import { PlanError } from './PlanError'
import { PlanLoader } from './PlanLoader'
import { PlanResult } from './PlanResult'
import { planServiceRest } from './planServiceRest'
import { useGeneratePlan } from './useGeneratePlan'

export const PlanPanel: FC = () => {
  const { generatePlan, isErrored, isLoaded, isLoading } = useGeneratePlan(planServiceRest)

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <TextButton
          className="text-white bg-gray-800 hover:bg-gray-900 focus:bg-gray-900 active:bg-gray-900"
          loading={isLoading}
          onClick={generatePlan}
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
