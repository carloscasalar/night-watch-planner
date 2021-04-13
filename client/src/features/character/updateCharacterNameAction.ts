import { createAction } from 'typesafe-actions';

export interface UpdateCharacterNameActionPayload {
  characterId: string;
  name: string;
}

export const updateCharacterNameAction = createAction(
  'CHARACTER/UPDATE_CHARACTER_NAME',
)<UpdateCharacterNameActionPayload>();
