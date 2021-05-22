export interface Character {
  id: string;
  name: string;
  requiredSleepTime: number;
}

export interface FormattedCharacter {
  name: string;
  requiredSleepTime: string;
}
