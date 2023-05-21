export const toHourMinutesList = (minutes: number): [number, number] => {
  const minutesRemaining = minutes % 60
  const hours = (minutes - minutesRemaining) / 60

  return [hours, minutesRemaining]
}
