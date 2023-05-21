import { type RootState } from '../../app/store/rootStore'
import { type Character } from '../character/schema'

export const getCharacters = ({
  party: { characters }
}: RootState): Record<string, Character> => ({
  ...characters
})
