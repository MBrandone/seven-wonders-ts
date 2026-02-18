import { Game } from "../game.entity";

export interface GameRepository {
	findById(id: string): Promise<Game | null>;
	save(game: Game): Promise<void>;
}
