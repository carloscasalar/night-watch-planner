import { RootState } from '../../app/store/rootStore';

export const getCharacterIds = ({ party: { order } }: RootState): string[] => [
  ...order,
];
