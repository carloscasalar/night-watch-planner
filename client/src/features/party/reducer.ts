import { createSlice, type SliceCaseReducers, type PayloadAction } from '@reduxjs/toolkit'
import { type Character } from '../character/schema'
import { PartyStateRepository } from './PartyStateRepository'
import { IncreaseCharacterSleepTime } from '../../usecases/IncreaseCharacterSleepTime'
import { UpdateCharacterName } from '../../usecases/UpdateCharacterName'
import { AddCharacterWithName } from '../../usecases/AddCharacterWithName'
import { RemoveCharacter } from '../../usecases/RemoveCharacter'

export interface PartyState {
  characters: Record<string, Character>
  order: string[]
}

interface WithName {
  name: string
}

interface WithCharacterId {
  characterId: string
}

interface WithCharacterIdAndMinutes {
  characterId: string
  minutes: number
}

interface WithCharacterIdAndName {
  characterId: string
  name: string
}

const partySlice = createSlice<PartyState, SliceCaseReducers<PartyState>>({
  name: 'party',
  initialState: {
    characters: {},
    order: []
  },
  reducers: {
    addCharacterAction: (state, { payload: { name } }: PayloadAction<WithName>) => {
      const repository = new PartyStateRepository(state)
      const useCase = new AddCharacterWithName(repository)

      useCase.execute(name)

      return repository.state
    },
    removeCharacterAction: (state, { payload: { characterId } }: PayloadAction<WithCharacterId>) => {
      const repository = new PartyStateRepository(state)
      const useCase = new RemoveCharacter(repository)

      useCase.execute(characterId)

      return repository.state
    },
    increaseCharacterSleepTimeAction: (state, { payload: { characterId, minutes } }: PayloadAction<WithCharacterIdAndMinutes>) => {
      const repository = new PartyStateRepository(state)
      const useCase = new IncreaseCharacterSleepTime(repository)

      useCase.execute(characterId, minutes)

      return repository.state
    },
    updateCharacterNameAction: (state, { payload: { characterId, name } }: PayloadAction<WithCharacterIdAndName>) => {
      const repository = new PartyStateRepository(state)
      const useCase = new UpdateCharacterName(repository)

      useCase.execute(characterId, name)

      return repository.state
    }
  }
})

export const party = partySlice.reducer
export const {
  addCharacterAction,
  removeCharacterAction,
  increaseCharacterSleepTimeAction,
  updateCharacterNameAction
} = partySlice.actions
