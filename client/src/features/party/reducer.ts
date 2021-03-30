import { createReducer, RootAction } from 'typesafe-actions';
import { Character } from '../character/schema';

export interface PartyState {
  characters: Record<string, Character>;
  order: string[];
}

export const party = createReducer<PartyState, RootAction>({
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
