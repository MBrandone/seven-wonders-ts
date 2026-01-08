import { ALL_CARDS } from "../../../domain/cards/all-cards/all-cards";
import { Deck } from "../../../domain/deck/deck.entity";
import type { SevenWondersGameRepository } from "../../../domain/game-repository";
import { ALL_WONDERS } from "../../../domain/wonder.entity";

export class StartGameUseCase {
	constructor(private readonly sevenWonderGameRepository: SevenWondersGameRepository) {}

	async execute(gameId: string) {
		const startedGame = await this.sevenWonderGameRepository.findById(gameId);
		if (!startedGame) {
			throw new Error("Game not found");
		}

		const deck = new Deck(ALL_CARDS);

		startedGame.assignWonders(ALL_WONDERS);
		startedGame.assignCards(deck);

		this.sevenWonderGameRepository.addGame(startedGame)

		return startedGame;
	}
}
