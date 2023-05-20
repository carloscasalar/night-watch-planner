import { toEntityById } from '@mappers/toEntityById'
import { type PlanEntity } from '@/domain/PlanEntity'
import { type PlanRepository } from '@domain/PlanRepository'
import { type PlanState } from './reducer'
import { type Watch } from './schema'

export class PlanStateRepository implements PlanRepository {
  constructor (private readonly state: PlanState) {}
  getPlan () {
    return {
      totalTimeMinutes: this.state.totalTimeMinutes,
      score: this.state.score,
      watches: this.state.watchOrder.map(watchId => this.getWatch(watchId))
    }
  }

  getWatch (watchId: string) {
    const watch = this.state.watches[watchId]
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
      message: this.state.message
    }

    return {
      ...this.state,
      ...planState
    }
  }
}
