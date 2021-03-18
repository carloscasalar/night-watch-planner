import { RootState } from '../../app/store/rootStore';
import { CharacterId } from '../character/schema';

export const getCharacterIds = ({
  party: { order },
}: RootState): CharacterId[] => [...order];
