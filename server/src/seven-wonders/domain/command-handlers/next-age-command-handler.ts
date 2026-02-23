import { NextAgeCommand } from "../commands/next-age-command";
import { SevenWondersGameRepository } from "../game-repository";

export class NextAgeCommandHandler {
	constructor(private readonly gameRepository: SevenWondersGameRepository) {}

	async handle(command: NextAgeCommand): Promise<void> {
		const game = await this.gameRepository.findById(command.gameId);
		if (!game) {
			throw new Error("Game not found");
		}
		game.nextAge();
	}
}
