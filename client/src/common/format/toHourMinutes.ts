export const toHourMinutes = (minutes: number): string => {
  const minutesRemaining = minutes % 60;
  const hours = (minutes - minutesRemaining) / 60;

  return minutesRemaining
    ? `${hours} hours, ${minutesRemaining} minutes`
    : `${hours} hours`;
};
