import { type PartyEntity } from './PartyEntity'
import { type PlanEntity } from './PlanEntity'

export interface PlanRequest {
  requiredSleepTime: number
  party: PartyEntity
}

export interface PlanError {
  message: string
}

export type PlanResponse = [PlanEntity, null] | [null, PlanError]

export interface PlanService {
  generatePlan: (planRequest: PlanRequest) => Promise<PlanResponse>
}
