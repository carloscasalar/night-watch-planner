import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getErrorMessage } from './getErrorMessage';

export const PlanError: FC = () => {
  const errorMessage = useSelector(getErrorMessage);
  const description =
    errorMessage || 'An unexpected error occurred, please try again.';
  return (
    <div className="mt-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{description}</span>
    </div>
  );
};
