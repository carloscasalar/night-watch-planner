import { type Attributes, iconAttributes, type IconName } from './iconAttributes'
import { type ReactElement, useMemo } from 'react'

interface Markup {
  markup: ReactElement[]
}

export type ComputedIconAttributes = Omit<Attributes, 'getMarkup'> & Markup

export const useGetIconAttributes = (
  iconName: IconName,
  foregroundColor: string
): ComputedIconAttributes => {
  const { getMarkup, ...otherProps } = iconAttributes[iconName]
  const markup = useMemo(
    () =>
      getMarkup({
        foregroundColor
      }),
    [getMarkup, foregroundColor]
  )
  return { ...otherProps, markup }
}
