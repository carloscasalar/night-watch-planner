import { createReducer } from 'typesafe-actions';
import { Character, CharacterId } from '../character/schema';

export interface PartyState {
  characters: Record<CharacterId, Character>;
  order: CharacterId[];
}

export const party = createReducer<PartyState>({
  characters: {},
  order: [],
});
