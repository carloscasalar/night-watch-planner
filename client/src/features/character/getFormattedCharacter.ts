import { createSelector } from 'reselect';
import { Character, CharacterId, FormattedCharacter } from './schema';
import { getCharacters } from '../party/getCharacters';

const getId = (_status: unknown, id: CharacterId | undefined): CharacterId =>
  id || '';

const toFormattedCharacter = (character: Character): FormattedCharacter => ({
  name: character.name,
  requiredSleepTime: `${character.requiredSleepTime} minutes`,
});

export const getFormattedCharacter = createSelector(
  [getCharacters, getId],
  (characters: Record<CharacterId, Character>, id: CharacterId) =>
    characters[id] ? toFormattedCharacter(characters[id]) : null,
);
