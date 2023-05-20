import { type RootState } from '@/app/store/rootStore'
import { toEntityById } from '@mappers/toEntityById'
import { type PlanEntity } from '@/domain/PlanEntity'
import { type PlanRepository } from '@domain/PlanRepository'
import { type PlanState } from './reducer'
import { type Watch } from './schema'

export class PlanStateRepository implements PlanRepository {
  constructor (private readonly state: RootState) {}
  getPlan () {
    return {
      totalTimeMinutes: this.state.plan.totalTimeMinutes,
      score: this.state.plan.score,
      watches: this.state.plan.watchOrder.map(watchId => this.getWatch(watchId))
    }
  }

  getWatch (watchId: string) {
    const watch = this.state.plan.watches[watchId]
    return {
      id: watch.id,
      sleepingCharacters: watch.sleepingCharacters,
      watchfulCharacters: watch.watchfulCharacters,
      minutesLength: watch.minutesLength
    }
  }

  save (planEntity: PlanEntity) {
    const planState: PlanState = {
      totalTimeMinutes: planEntity.totalTimeMinutes,
      watchOrder: planEntity.watches.map((watch) => watch.id),
      watches: toEntityById<string, Watch>(planEntity.watches),
      score: planEntity.score,
      message: this.state.plan.message
    }

    return {
      ...this.state,
      plan: planState
    }
  }
}
