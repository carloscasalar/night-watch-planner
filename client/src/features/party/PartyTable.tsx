import { FC } from 'react';
import { useSelector } from 'react-redux';
import { CharacterCard } from '../character/CharacterCard';
import { getCharacterIds } from './getCharacterIds';

export const PartyTable: FC = () => {
  const characterIds = useSelector(getCharacterIds);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-2">
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            {characterIds.map((id) => (
              <CharacterCard characterId={id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
