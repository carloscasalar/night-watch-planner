import { createAction } from 'typesafe-actions';

export interface UpdateCharacterNameActionPayload {
  characterId: string;
  name: string;
}

export const updateCharacterNameAction = createAction(
  'UPDATE_CHARACTER_NAME',
)<UpdateCharacterNameActionPayload>();
