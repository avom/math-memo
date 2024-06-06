export enum DifficultyLevel {
  VeryEasy,
  Easy,
  Medium,
  Hard,
  VeryHard,
}

export interface GameSettings {
  readonly cols: number;
  readonly rows: number;
  readonly difficulty: DifficultyLevel;
}
