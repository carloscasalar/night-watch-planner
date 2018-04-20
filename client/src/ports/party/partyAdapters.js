import { toCharacterEntity, toPlainCharacter } from './characterAdapters';
import PartyEntity from '../../domain/PartyEntity';

export const toPartyEntity = ({ characters: plainCharacters }) => {
  const characters = plainCharacters.map(toCharacterEntity);
  return new PartyEntity({ characters });
};

export const toPlainParty = domainParty => ({
  characters: domainParty.characters.map(toPlainCharacter),
  isEmpty: domainParty.isEmpty,
});
