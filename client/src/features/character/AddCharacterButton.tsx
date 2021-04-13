import { FC } from 'react';
import { Icon } from '../../common/components/icon/Icon';
import { useDispatch } from 'react-redux';
import { addCharacterAction } from './addCharacterAction';

export const AddCharacterButton: FC = () => {
  const dispatch = useDispatch();

  const addCharacter = () =>
    dispatch(
      addCharacterAction({
        name: 'Rename me!',
      }),
    );

  return (
    <div className="h-full flex items-center opacity-25 hover:opacity-100">
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
