import { SevenWondersGame } from "./seven-wonders-game";

export interface GameRepository {
    findById(gameId: string): Promise<SevenWondersGame | null>;
  }