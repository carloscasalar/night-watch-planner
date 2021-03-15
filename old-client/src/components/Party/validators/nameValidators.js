const DUPLICATED_NAME = 'There is already a character with this name.';
export const NO_ERROR = '';

export const nameError = (forbiddenNames = [], name) =>
  (forbiddenNames.includes(name) ? DUPLICATED_NAME : NO_ERROR);

