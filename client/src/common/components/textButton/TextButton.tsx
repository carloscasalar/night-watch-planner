import { FC } from 'React';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export type TextButtonProps = PropsWithChildren<{
  className?: string;
  onClick: () => void;
}>;

export const TextButton: FC<TextButtonProps> = ({
  className,
  onClick,
  children,
}) => {
  return (
    <button
      className={classNames(
        'inline-block px-6 py-2.5 font-medium text-xs leading-tight rounded shadow-md  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
