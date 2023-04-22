import { type Character } from '../character/schema'
import { type Plan } from './reducer'

export interface PlanRequest {
  requiredSleepTime: number
  party: Character[]
}

export interface PlanError {
  message: string
}

export type PlanResponse = [Plan, null] | [null, PlanError]

export interface PlanService {
  generatePlan: (planRequest: PlanRequest) => Promise<PlanResponse>
}
