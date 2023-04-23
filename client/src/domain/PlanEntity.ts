import { type CharacterId } from './CharacterEntity'

export interface Score {
  readonly soft: number
  readonly medium: number
  readonly hard: number
  readonly feasible: boolean
}

export interface Watch {
  readonly sleepingCharacters: CharacterId[]
  readonly watchfulCharacters: CharacterId[]
  readonly minutesLength: number
}

export interface PlanEntity {
  readonly score: Score
  readonly totalTimeMinutes: number
  readonly watches: Watch[]
}
