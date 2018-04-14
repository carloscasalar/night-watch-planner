import CharacterEntity from '../domain/CharacterEntity';

export const toCharacterEntity = ({ id, name, requiredSleepTime }) =>
  new CharacterEntity({ id, name, requiredSleepTime });

export const toPlainCharacter = domainCharacter => domainCharacter.toJSON();
