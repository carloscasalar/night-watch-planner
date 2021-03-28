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
      <div className="flex items-center border-gray-200 border p-4 rounded-lg shadow-lg">
        <Icon
          name="barbarian"
          className="w-16 h-16 rounded-full mr-4 text-black"
        />
        <div className="flex-grow">
          <h2 className="text-gray-900 title-font font-medium text-xl cursor-text">
            {character?.name}
          </h2>
          <p className="flex items-center space-x-4 text-gray-700 text-lg">
            <Icon name="sleep-time" className="w-12 h-12 inline-block" />
            <span className="pt-3">{character?.requiredSleepTime}</span>
          </p>
        </div>
      </div>
    )
  );
};
