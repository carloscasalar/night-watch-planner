import { createReducer } from 'typesafe-actions';
import { Character, CharacterId } from '../character/schema';

export interface PartyState {
  characters: Record<CharacterId, Character>;
  order: CharacterId[];
}

export const party = createReducer<PartyState>({
  characters: {
    gandalf: {
      id: 'gandalf',
      name: 'Gandalf',
      requiredSleepTime: 5 * 60,
    },
    legolas: {
      id: 'legolas',
      name: 'Legolas',
      requiredSleepTime: 4 * 60 + 30,
    },
    boromir: {
      id: 'boromir',
      name: 'Boromir',
      requiredSleepTime: 6 * 60,
    },
    frodo: {
      id: 'frodo',
      name: 'Frodo',
      requiredSleepTime: 6 * 60,
    },
  },
  order: ['gandalf', 'legolas', 'frodo', 'boromir'],
});
