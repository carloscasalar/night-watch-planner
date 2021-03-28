import { FC } from 'react';
import { Icon } from '../../common/components/icon/Icon';

export const AddCharacterButton: FC = () => {
  return (
    <div className="h-full flex items-center opacity-25 hover:opacity-100">
      <div className="ml-2 rounded-full border-gray-200 border shadow-lg hover:shadow-xl cursor-pointer">
        <Icon
          name="add-character"
          className="w-24 h-24 p-4 self-center text-black"
        />
      </div>
    </div>
  );
};
