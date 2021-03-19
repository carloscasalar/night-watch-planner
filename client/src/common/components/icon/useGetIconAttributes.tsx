import { Attributes, iconAttributes, IconName } from './iconAttributes';
import { ReactElement, useMemo } from 'react';

interface Markup {
  markup: ReactElement[];
}

export type ComputedIconAttributes = Omit<Attributes, 'getMarkup'> & Markup;

export const useGetIconAttributes = (
  iconName: IconName,
  foregroundColor: string,
  backgroundColor: string,
): ComputedIconAttributes => {
  const { viewBox, stroke, getMarkup } = iconAttributes[iconName];
  const markup = useMemo(
    () =>
      getMarkup({
        foregroundColor: foregroundColor,
        backgroundColor: backgroundColor,
      }),
    [getMarkup, foregroundColor, backgroundColor],
  );
  return { viewBox, stroke, markup };
};
