import { FC } from 'react';
import { iconAttributes, IconName } from './iconAttributes';

export interface IconProps {
  name: IconName;
  className?: string;
}

export const Icon: FC<IconProps> = ({ name, className }) => {
  const { viewBox, stroke, paths } = iconAttributes[name];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={viewBox}
      stroke={stroke}
      className={className}
    >
      {paths}
    </svg>
  );
};
