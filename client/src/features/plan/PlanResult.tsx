import { useAppSelector } from '@/app/store/hooks'
import { type FC } from 'react'
import { WatchCard } from './WatchCard'
import { getPlanSummary } from './getPlanSummary'

export const PlanResult: FC = () => {
  const [watchIds, duration] = useAppSelector(getPlanSummary)
  const [hours, minutes] = duration

  return (
    <ol className="relative my-5 border-l border-gray-700">
      {watchIds.map(id =>
        <li key={id} className="mb-10 ml-4">
          <WatchCard id={id} />
        </li>)}
        <li>
          <div className="absolute w-5 h-5 rounded-full mt-1 -left-2.5 border border-gray-900 bg-gray-700"></div>
          <time className="px-3 text-sm font-normal leading-none text-gray-500">Total Watch duration: {hours}h:{minutes}m</time>
        </li>
    </ol>
  )
}
