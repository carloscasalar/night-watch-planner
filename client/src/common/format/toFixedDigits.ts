export const toFixedDigits = (integer: number, digits: number) => {
  const integerString = integer.toString()
  const integerStringLength = integerString.length
  const zeros = digits - integerStringLength
  return zeros > 0
    ? `${'0'.repeat(zeros)}${integerString}`
    : integerString
}
