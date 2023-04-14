import { RootState } from '../../app/store/rootStore';
import { Character } from '../character/schema';

export const getCharacters = ({
  party: { characters },
}: RootState): Record<string, Character> => ({
  ...characters,
});
