import type { SevenWondersGame } from "./seven-wonders-game";

export interface SevenWondersGameRepository {
	findById(gameId: string): Promise<SevenWondersGame | null>;
	addGame(game: SevenWondersGame): Promise<void>;
}
