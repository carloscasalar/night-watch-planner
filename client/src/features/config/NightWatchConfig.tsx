import { type FC } from 'react'

import { getFormattedMaxTotalTimeSpent } from './getFormattedMaxTotalTimeSpent'
import { increaseMaxTotalTimeSpentTimeAction } from './reducer'
import { CounterControl } from '../../common/components/counterControl/CounterControl'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'

const MINUTES_INCREMENT = 30

export const NightWatchConfig: FC = () => {
  const maxTimeSpent = useAppSelector(getFormattedMaxTotalTimeSpent)
  const dispatch = useAppDispatch()
  const increaseTime = () =>
    dispatch(increaseMaxTotalTimeSpentTimeAction(MINUTES_INCREMENT))
  const decreaseTime = () =>
    dispatch(increaseMaxTotalTimeSpentTimeAction(-MINUTES_INCREMENT))
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <h1 className="py-5 text-3xl font-bold title-font">
          Plan Configuration
        </h1>
        <CounterControl
          icon="sand-clock"
          size="big"
          label="Max time spent"
          value={maxTimeSpent}
          increase={increaseTime}
          decrease={decreaseTime}
        />
      </div>
    </section>
  )
}
