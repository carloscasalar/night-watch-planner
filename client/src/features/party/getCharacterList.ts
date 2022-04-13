import { RootState } from '../../app/store/rootStore';
import { Character } from '../character/schema';

export const getCharacterList = ({
  party: { characters },
}: RootState): Character[] => Object.values(characters);
