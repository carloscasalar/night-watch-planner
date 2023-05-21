export interface Score {
  soft: number
  medium: number
  hard: number
  feasible: boolean
}

export interface Watch {
  id: string
  sleepingCharacters: string[]
  watchfulCharacters: string[]
  minutesLength: number
}
