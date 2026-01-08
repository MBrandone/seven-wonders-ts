import type { SevenWondersGameRepository } from "../../../domain/game-repository";

export class NextAgeUseCase {
	constructor(private readonly gameRepository: SevenWondersGameRepository) {}

	async execute(gameId: string) {
		const game = await this.gameRepository.findById(gameId);
		if (!game) {
			throw new Error("Game not found");
		}
		game.nextAge();
	}
}
