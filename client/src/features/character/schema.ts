export type CharacterId = string;

export interface Character {
  id: CharacterId;
  name: string;
  requiredSleepTime: number;
}

export interface FormattedCharacter {
  name: string;
  requiredSleepTime: string;
}
