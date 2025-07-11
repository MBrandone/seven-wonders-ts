import { ALL_CARDS } from "../../domain/cards/all-cards/all-cards";
import { Deck } from "../../domain/deck/deck.entity";
import type { GameRepository } from "../../domain/game-repository";
import { ALL_WONDERS } from "../../domain/wonder.entity";

export class StartGameUseCase {
	constructor(private readonly gameRepository: GameRepository) {}

	async execute(gameId: string) {
		const game = await this.gameRepository.findById(gameId);
		if (!game) {
			throw new Error("Game not found");
		}

		const deck = new Deck(ALL_CARDS);

		game.assignWonders(ALL_WONDERS);
		game.assignCards(deck);

		return game;
	}
}
