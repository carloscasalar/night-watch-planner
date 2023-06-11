import { LOCAL_STORAGE_REDUX_KEY } from '@/app/store/middleware/syncWithLocalStorage'
import { createSlice, type PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit'
import { AddCharacterWithName } from '@usecases/AddCharacterWithName'
import { IncreaseCharacterSleepTime } from '@usecases/IncreaseCharacterSleepTime'
import { RemoveCharacter } from '@usecases/RemoveCharacter'
import { UpdateCharacterName } from '@usecases/UpdateCharacterName'
import { type Character } from '../character/schema'
import { PartyStateRepository } from './PartyStateRepository'

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

const initialState: PartyState = (() => {
  const emptyPartyState: PartyState = {
    characters: {},
    order: []
  }
  const persistedState = localStorage.getItem(LOCAL_STORAGE_REDUX_KEY)
  return persistedState ? JSON.parse(persistedState).party : emptyPartyState
})()

const partySlice = createSlice<PartyState, SliceCaseReducers<PartyState>>({
  name: 'party',
  initialState,
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
