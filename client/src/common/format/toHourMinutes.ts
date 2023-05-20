import { toHourMinutesList } from './toHourMinutesList'

export const toHourMinutes = (minutes: number): string => {
  const [hours, minutesRemaining] = toHourMinutesList(minutes)

  return minutesRemaining !== 0
    ? `${hours} hours, ${minutesRemaining} minutes`
    : `${hours} hours`
}
