import { type FC } from 'react'
import { useAppSelector } from '@/app/store/hooks'
import { getWatchesList } from './getWatchesList'

export const PlanResult: FC = () => {
  const watchIds = useAppSelector(getWatchesList)

  return (
    <section>
      {watchIds.map((id) => <div key={id}>{id}</div>)}
    </section>
  )
}
