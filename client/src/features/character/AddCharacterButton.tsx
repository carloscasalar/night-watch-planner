import { FC } from 'react';
import { Icon } from '../../common/components/icon/Icon';

export const AddCharacterButton: FC = () => {
  return (
    <div className="h-full border-gray-200 border p-4 rounded-lg shadow-lg grid grid-cols-4 gap-1">
      <div className="flex items-center cursor-pointer">
        <Icon
          name="barbarian"
          className="w-6 h-6 rounded-full mr-4 text-black"
        />
        +
      </div>
      <div className="flex items-center cursor-pointer">
        <Icon name="elf-ear" className="w-6 h-6 rounded-full mr-4 text-black" />
        <span className="transform hover:translate-x-3">+</span>
      </div>
      <div className="flex items-center cursor-pointer">
        <Icon name="rogue" className="w-6 h-6 rounded-full mr-4 text-black" /> +
      </div>
      <div className="flex items-center cursor-pointer">
        <Icon name="rogue" className="w-6 h-6 rounded-full mr-4 text-black" /> +
      </div>
      <div className="flex items-center cursor-pointer">
        <Icon name="rogue" className="w-6 h-6 rounded-full mr-4 text-black" /> +
      </div>
    </div>
  );
};
