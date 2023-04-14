import { FC } from 'react';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export type TextButtonProps = PropsWithChildren<{
  className?: string;
  loading?: boolean;
  onClick: () => void;
}>;

export const TextButton: FC<TextButtonProps> = ({
  className,
  loading = false,
  onClick,
  children,
}) => {
  const stateClass = loading
    ? 'bg-opacity-20 hover:bg-opacity-20 cursor-wait'
    : '';
  return (
    <button
      className={classNames(
        'inline-block px-6 py-2.5 font-medium text-xs leading-tight rounded shadow-md  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out',
        stateClass,
        className,
      )}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
