import { FC } from 'react';
import { useSelector } from 'react-redux';
import { CharacterCard } from '../character/CharacterCard';
import { getCharacterIds } from './getCharacterIds';
import { AddCharacterButton } from '../character/AddCharacterButton';
import { Icon } from '../../common/components/icon/Icon';

export const PartyTable: FC = () => {
  const characterIds = useSelector(getCharacterIds);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap content-start items-center">
          <Icon name="party" className="w-8 h-8 text-black" />
          <h1 className="text-3xl py-5 ml-3 font-bold title-font">
            Characters
          </h1>
        </div>
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
