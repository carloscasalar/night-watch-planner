import { type PlanEntity } from './PlanEntity'

export interface PlanRepository {
  getPlan: () => PlanEntity
  save: (planEntity: PlanEntity) => void
}
