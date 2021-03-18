import { RootState } from '../../app/store/rootStore';
import { Character, CharacterId } from '../character/schema';

export const getCharacters = ({
  party: { characters },
}: RootState): Record<CharacterId, Character> => ({
  ...characters,
});
