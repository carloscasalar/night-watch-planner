export interface Score {
  soft: number;
  medium: number;
  hard: number;
  feasible: boolean;
}

export interface Watch {
  sleepingCharacters: string[];
  watchfulCharacters: string[];
  minutesLength: number;
}
