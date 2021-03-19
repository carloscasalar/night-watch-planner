import { createSelector } from 'reselect';
import { Character, CharacterId, FormattedCharacter } from './schema';
import { getCharacters } from '../party/getCharacters';

const toHourMinutes = (minutes: number): string => {
  const minutesRemaining = minutes % 60;
  const hours = (minutes - minutesRemaining) / 60;

  return minutesRemaining
    ? `${hours} hours, ${minutesRemaining} minutes`
    : `${hours} hours`;
};

const getId = (_status: unknown, id: CharacterId | undefined): CharacterId =>
  id || '';

const toFormattedCharacter = (character: Character): FormattedCharacter => ({
  name: character.name,
  requiredSleepTime: toHourMinutes(character.requiredSleepTime),
});

export const getFormattedCharacter = createSelector(
  [getCharacters, getId],
  (characters: Record<CharacterId, Character>, id: CharacterId) =>
    characters[id] ? toFormattedCharacter(characters[id]) : null,
);
