import { CharacterId } from './schema';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getFormattedCharacter } from './getFormattedCharacter';
import { RootState } from '../../app/store/rootStore';
import { Icon } from '../../common/components/icon/Icon';

export interface CharacterCardProps {
  characterId: CharacterId;
}

export const CharacterCard: FC<CharacterCardProps> = ({ characterId }) => {
  const character = useSelector((state: RootState) =>
    getFormattedCharacter(state, characterId),
  );
  return (
    character && (
      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
        <Icon
          name="head-shape"
          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
        />
        <div className="flex-grow">
          <h2 className="text-gray-900 title-font font-medium">
            {character?.name}
          </h2>
          <p className="text-gray-500">{character?.requiredSleepTime}</p>
        </div>
      </div>
    )
  );
};
