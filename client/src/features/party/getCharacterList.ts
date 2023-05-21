import { type RootState } from '../../app/store/rootStore'
import { type Character } from '../character/schema'

export const getCharacterList = ({
  party: { characters }
}: RootState): Character[] => Object.values(characters)
