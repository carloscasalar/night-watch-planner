import { FC } from 'React';
import { Icon } from '../icon/Icon';
export interface DeleteButtonProps {
  className?: string;
  onClick: () => void;
}
export const DeleteButton: FC<DeleteButtonProps> = ({
  className = 'p-1 focus:outline-none',
  onClick,
}) => {
  return (
    <button className={className} onClick={onClick}>
      <Icon
        name="remove"
        className="w-6 h-6 text-gray-300 rounded-full shadow-lg hover:shadow-2xl cursor-pointer"
      />
    </button>
  );
};
