import { type PlanEntity, type WatchId, type Watch } from './PlanEntity'

export interface PlanRepository {
  getPlan: () => PlanEntity
  getWatch: (id: WatchId) => Watch
  save: (planEntity: PlanEntity) => void
}
