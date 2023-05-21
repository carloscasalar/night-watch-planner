import { createSelector } from 'reselect'
import { type RootState } from '@/app/store/rootStore'
import { PlanStateRepository } from './PlanStateRepository'
import { PartyStateRepository } from '@/features/party/PartyStateRepository'
import { toHourMinutesList } from '@format/toHourMinutesList'
import { toFixedDigits } from '@/common/format/toFixedDigits'

const TWO_DIGITS = 2

const defaultWatch = {
  watchfulCharacters: [],
  duration: [0, 0]
}

export const getWatch = createSelector(
  (state: RootState) => new PlanStateRepository(state.plan),
  (state: RootState) => new PartyStateRepository(state.party),
  (_: RootState, watchId: string) => watchId,
  (planRepository, partyRepository, watchId) => {
    // TODO: move this logic to a use case
    const { watchfulCharacters: watchfulCharacterIds, minutesLength } = planRepository.getWatch(watchId) ?? defaultWatch
    const watchfulCharacters = watchfulCharacterIds
      .map(characterId => partyRepository.getParty().findCharacterById(characterId))
      .filter(Boolean)
      .map(({ id, name }) => ({
        id: id satisfies string,
        name
      }))
    const duration = toHourMinutesList(minutesLength).map(time => toFixedDigits(time, TWO_DIGITS))
    return {
      watchfulCharacters,
      duration
    }
  }
)
