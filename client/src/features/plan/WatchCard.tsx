import { type FC } from 'react'
import { getWatch } from './getWatch'
import { useAppSelector } from '@/app/store/hooks'

export interface WatchCardProps {
  id: string
}
export const WatchCard: FC<WatchCardProps> = ({ id }) => {
  const { watchfulCharacters, duration } = useAppSelector(state => getWatch(state, id))
  const [hours, minutes] = duration

  return (
    <>
      <div className="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-gray-900 bg-gray-700"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-500">Shift duration: {hours}h:{minutes}m</time>
      <h3 className="text-lg font-semibold text-gray-900">Watchful Characters</h3>
      <p className="mb-4 text-base font-normal text-gray-400">
        {watchfulCharacters.map(({ id, name }) => <span key="id" className="mx-3">{name}</span>)}
      </p>
    </>
  )
}
