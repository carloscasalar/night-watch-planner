import { createReducer, RootAction } from 'typesafe-actions';
import { Character } from '../character/schema';
import { increaseCharacterSleepTimeAction } from '../character/increaseCharacterSleepTimeAction';
import { PartyStateRepository } from './PartyStateRepository';
import { IncreaseCharacterSleepTime } from '../../usecases/IncreaseCharacterSleepTime';
import { updateCharacterNameAction } from '../character/updateCharacterNameAction';
import { UpdateCharacterName } from '../../usecases/UpdateCharacterName';

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
})
  .handleAction(
    increaseCharacterSleepTimeAction,
    (state, { payload: { characterId, minutes } }) => {
      const repository = new PartyStateRepository(state);
      const useCase = new IncreaseCharacterSleepTime(repository);

      useCase.execute(characterId, minutes);

      return repository.state;
    },
  )
  .handleAction(
    updateCharacterNameAction,
    (state, { payload: { characterId, name } }) => {
      const repository = new PartyStateRepository(state);
      const useCase = new UpdateCharacterName(repository);

      useCase.execute(characterId, name);

      return repository.state;
    },
  );
