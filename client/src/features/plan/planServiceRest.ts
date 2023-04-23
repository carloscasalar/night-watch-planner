import { type CharacterEntity } from '../../domain/CharacterEntity'
import { type PlanEntity } from '../../domain/PlanEntity'
import { type PlanError, type PlanRequest, type PlanResponse, type PlanService } from '../../domain/PlanService'

const host: string = import.meta.env.VITE_PLAN_REST_API_HOST
const planEndpointURL = `${host}/v1/optimize`

interface CharacterDefinition {
  name: string
  senses: string[]
  requiredSleepTime: number
}

interface PlanRequestPayload {
  maxTotalTimeSpent: number
  party: CharacterDefinition[]
}

interface ScoreDefinition {
  initScore: number
  hardScore: number
  mediumScore: number
  softScore: number
  feasible: boolean
}

interface WatchDefinition {
  sleepingCharacters: string[]
  watchfulCharacters: string[]
  length: number
}

export interface PlanResponsePayload {
  totalTime: number
  score: ScoreDefinition
  watchesSummary: WatchDefinition[]
}

const toPlanEntity = (response: PlanResponsePayload): PlanEntity => {
  const watches = response.watchesSummary.map((watch) => ({
    sleepingCharacters: watch.sleepingCharacters,
    watchfulCharacters: watch.watchfulCharacters,
    minutesLength: watch.length
  }))
  return {
    score: {
      soft: response.score.softScore,
      medium: response.score.mediumScore,
      hard: response.score.hardScore,
      feasible: response.score.feasible
    },
    totalTimeMinutes: response.totalTime,
    watches
  }
}

const toCharacterDefinition = ({
  id,
  requiredSleepTime
}: CharacterEntity): CharacterDefinition => ({
  name: id,
  requiredSleepTime,
  senses: ['Normal']
})

const toPlanRequestPayload = (planRequest: PlanRequest): PlanRequestPayload => ({
  party: planRequest.party.characters.map(toCharacterDefinition),
  maxTotalTimeSpent: planRequest.requiredSleepTime
})

export const planServiceRest: PlanService = {
  generatePlan: async (planRequest: PlanRequest): Promise<PlanResponse> => {
    const response = await fetch(planEndpointURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toPlanRequestPayload(planRequest))
    })
    if (response.ok) {
      const planResponse: PlanResponsePayload = await response.json()
      return [toPlanEntity(planResponse), null]
    } else {
      const error: PlanError = await response.json()
      return [null, error]
    }
  }
}
