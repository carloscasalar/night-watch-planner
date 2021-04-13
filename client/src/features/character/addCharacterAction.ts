import { createAction } from 'typesafe-actions';

export interface AddCharacterActionPayload {
  name: string;
}

export const addCharacterAction = createAction(
  'CHARACTER/ADD_CHARACTER',
)<AddCharacterActionPayload>();
