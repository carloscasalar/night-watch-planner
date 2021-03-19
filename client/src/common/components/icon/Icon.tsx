import { FC } from 'react';
import { IconName } from './iconAttributes';
import { useGetIconAttributes } from './useGetIconAttributes';

export interface IconProps {
  name: IconName;
  foregroundColor?: string;
  className?: string;
}

export const Icon: FC<IconProps> = ({
  name,
  foregroundColor = 'white',
  className,
}) => {
  const { viewBox, stroke, markup } = useGetIconAttributes(
    name,
    foregroundColor,
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={viewBox}
      stroke={stroke}
      className={className}
    >
      {markup}
    </svg>
  );
};
