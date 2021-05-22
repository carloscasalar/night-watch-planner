import { FC } from 'react';
import { Icon } from '../../common/components/icon/Icon';
import { useDispatch } from 'react-redux';
import { addCharacterAction } from './actions/addCharacterAction';
import classNames from 'classnames';

export interface AddCharacterButtonProps {
  className?: string;
}

export const AddCharacterButton: FC<AddCharacterButtonProps> = ({
  className,
}) => {
  const dispatch = useDispatch();

  const addCharacter = () =>
    dispatch(
      addCharacterAction({
        name: 'Rename me!',
      }),
    );

  return (
    <div
      className={classNames(
        'h-full flex items-center opacity-25 hover:opacity-100',
        className,
      )}
    >
      <button
        className="ml-2 rounded-full border-gray-200 border shadow-lg hover:shadow-xl cursor-pointer focus:outline-none"
        onClick={addCharacter}
      >
        <Icon
          name="add-character"
          className="w-24 h-24 p-4 self-center text-black"
        />
      </button>
    </div>
  );
};
