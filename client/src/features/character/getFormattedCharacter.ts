import { createSelector } from 'reselect'
import { type Character, type FormattedCharacter } from './schema'
import { getCharacters } from '../party/getCharacters'
import { toHourMinutes } from '../../common/format/toHourMinutes'

const getId = (_status: unknown, id: string | undefined): string => id ?? ''

const toFormattedCharacter = (character: Character): FormattedCharacter => ({
  name: character.name,
  requiredSleepTime: toHourMinutes(character.requiredSleepTime)
})

export const getFormattedCharacter = createSelector(
  [getCharacters, getId],
  (characters: Record<string, Character>, id: string) =>
    characters[id] !== undefined ? toFormattedCharacter(characters[id]) : null
)
