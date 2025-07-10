import type { GameRepository } from "../../domain/game-repository";

export class NextAgeUseCase {
	constructor(private readonly gameRepository: GameRepository) {}

	async execute(gameId: string) {
		const game = await this.gameRepository.findById(gameId);
		if (!game) {
			throw new Error("Game not found");
		}
		game.nextAge();
	}
}
