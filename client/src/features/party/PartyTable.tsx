import { FC } from 'react';
import { useSelector } from 'react-redux';
import { CharacterCard } from '../character/CharacterCard';
import { getCharacterIds } from './getCharacterIds';
import { AddCharacterButton } from '../character/AddCharacterButton';

export const PartyTable: FC = () => {
  const characterIds = useSelector(getCharacterIds);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <h1 className="text-3xl py-5 font-bold title-font">Characters</h1>
        <div className="grid grid-cols-3 gap-3">
          {characterIds.map((id) => (
            <CharacterCard characterId={id} />
          ))}
          <AddCharacterButton />
        </div>
      </div>
    </section>
  );
};
