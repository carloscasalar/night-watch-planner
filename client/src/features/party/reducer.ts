import { createReducer, RootAction } from 'typesafe-actions';
import { Character } from '../character/schema';
import { increaseCharacterSleepTimeAction } from '../character/actions/increaseCharacterSleepTimeAction';
import { PartyStateRepository } from './PartyStateRepository';
import { IncreaseCharacterSleepTime } from '../../usecases/IncreaseCharacterSleepTime';
import { updateCharacterNameAction } from '../character/actions/updateCharacterNameAction';
import { UpdateCharacterName } from '../../usecases/UpdateCharacterName';
import { addCharacterAction } from '../character/actions/addCharacterAction';
import { AddCharacterWithName } from '../../usecases/AddCharacterWithName';
import { removeCharacterAction } from '../character/actions/removeCharacterAction';
import { RemoveCharacter } from '../../usecases/RemoveCharacter';

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
  .handleAction(addCharacterAction, (state, { payload: { name } }) => {
    const repository = new PartyStateRepository(state);
    const useCase = new AddCharacterWithName(repository);

    useCase.execute(name);

    return repository.state;
  })
  .handleAction(
    removeCharacterAction,
    (state, { payload: { characterId } }) => {
      const repository = new PartyStateRepository(state);
      const useCase = new RemoveCharacter(repository);

      useCase.execute(characterId);

      return repository.state;
    },
  )
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
