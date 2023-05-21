import { type NightWatchConfigRepository } from '../../domain/NightWatchConfigRepository'
import { type NightWatchConfigState } from './reducer'
import { NightWatchConfigEntity } from '../../domain/NightWatchConfigEntity'

export class NightWatchConfigStateRepository
implements NightWatchConfigRepository {
  private _state: NightWatchConfigState

  constructor (state: NightWatchConfigState) {
    this._state = { ...state }
  }

  getNightWatchConfig (): NightWatchConfigEntity {
    return new NightWatchConfigEntity({
      maxTotalTimeSpent: this._state.maxTotalTimeSpent
    })
  }

  save (nightWatchConfig: NightWatchConfigEntity): void {
    this._state = {
      maxTotalTimeSpent: nightWatchConfig.maxTotalTimeSpent
    }
  }

  get state (): NightWatchConfigState {
    return {
      ...this._state
    }
  }
}
