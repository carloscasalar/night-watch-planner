import { createSelector } from 'reselect'
import { type PartyRepository } from './../../domain/PartyRepository'
import { type RootState } from '../../app/store/rootStore'
import { type PlanRequest } from '../../domain/PlanService'
import { type NightWatchConfigRepository } from '../../domain/NightWatchConfigRepository'
import { PartyStateRepository } from '../party/PartyStateRepository'
import { NightWatchConfigStateRepository } from './../config/NightWatchConfigStateRepository'

export const getPlanRequest = createSelector(
  (state: RootState): PartyRepository => new PartyStateRepository(state.party),
  (state: RootState): NightWatchConfigRepository => new NightWatchConfigStateRepository(state.config),
  (partyRepository, nightWatchConfigRepository): PlanRequest => {
    const party = partyRepository.getParty()
    const maxTotalTimeSpent = nightWatchConfigRepository.getNightWatchConfig().maxTotalTimeSpent
    return {
      party,
      maxTotalTimeSpent
    }
  })
