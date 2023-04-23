import { type Character } from '../character/schema'
import { type PlanError, type PlanRequest, type PlanResponse, type PlanService } from './PlanService'
import { type Plan } from './reducer'

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

const toCharacterDefinition = ({
  id,
  requiredSleepTime
}: Character): CharacterDefinition => ({
  name: id,
  requiredSleepTime,
  senses: ['Normal']
})

const toPlanRequestPayload = (planRequest: PlanRequest): PlanRequestPayload => ({
  party: planRequest.party.map(toCharacterDefinition),
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
      const plan: Plan = await response.json()
      return [plan, null]
    } else {
      const error: PlanError = await response.json()
      return [null, error]
    }
  }
}
