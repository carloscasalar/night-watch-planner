import { Attributes, iconAttributes, IconName } from './iconAttributes';
import { ReactElement, useMemo } from 'react';

interface Markup {
  markup: ReactElement[];
}

export type ComputedIconAttributes = Omit<Attributes, 'getMarkup'> & Markup;

export const useGetIconAttributes = (
  iconName: IconName,
  foregroundColor: string,
): ComputedIconAttributes => {
  const { getMarkup, ...otherProps } = iconAttributes[iconName];
  const markup = useMemo(
    () =>
      getMarkup({
        foregroundColor: foregroundColor,
      }),
    [getMarkup, foregroundColor],
  );
  return { ...otherProps, markup };
};
