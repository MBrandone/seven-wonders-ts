import { ALL_CARDS } from "../cards/all-cards/all-cards";
import { StartGameCommand } from "../commands/start-game-command";
import { Deck } from "../deck/deck.entity";
import { SevenWondersGameRepository } from "../game-repository";
import { SevenWondersGame } from "../seven-wonders-game";
import { ALL_WONDERS } from "../wonders/all-wonders";

export class StartGameCommandHandler {
	constructor(
		private readonly sevenWonderGameRepository: SevenWondersGameRepository,
	) {}

	async handle(command: StartGameCommand): Promise<SevenWondersGame> {
		const startedGame = await this.sevenWonderGameRepository.findById(
			command.gameId,
		);
		if (!startedGame) {
			throw new Error("Game not found");
		}

		const deck = new Deck(ALL_CARDS);

		startedGame.assignWonders(ALL_WONDERS);
		startedGame.assignCards(deck);

		this.sevenWonderGameRepository.addGame(startedGame);

		return startedGame;
	}
}
