import { CharacterId } from './schema';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getFormattedCharacter } from './getFormattedCharacter';
import { RootState } from '../../app/store/rootStore';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
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
