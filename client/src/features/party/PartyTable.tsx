import { FC } from 'react';
import { useSelector } from 'react-redux';
import { CharacterCard } from '../character/CharacterCard';
import { getCharacterIds } from './getCharacterIds';

export const PartyTable: FC = () => {
  const characterIds = useSelector(getCharacterIds);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto grid grid-cols-3 gap-3">
        {characterIds.map((id) => (
          <CharacterCard characterId={id} />
        ))}
      </div>
    </section>
  );
};
