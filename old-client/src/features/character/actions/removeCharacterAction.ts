import { createAction } from 'typesafe-actions';

export interface RemoveCharacterActionPayload {
  characterId: string;
}

export const removeCharacterAction = createAction(
  'CHARACTER/REMOVE_CHARACTER',
)<RemoveCharacterActionPayload>();
