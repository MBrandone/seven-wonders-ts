import type { SevenWondersGameRepository } from "../../../domain/game-repository";
import type { Player } from "../../../domain/player.entity";

export class NextTurnUseCase {
	constructor(private readonly gameRepository: SevenWondersGameRepository) {}

	async execute(gameId: string): Promise<void> {
		const game = await this.gameRepository.findById(gameId);
		if (!game) throw new Error("Partie non trouvée");

		if (game.players.some((player: Player) => !player.hasChosenCard())) {
			throw new Error("Tous les joueurs doivent avoir joué une carte");
		}

		game.players.forEach((player: Player) => player.playCard());

		const hands = game.players.map((player: Player) => player.cards);
		for (let i = 0; i < game.players.length; i++) {
			const nextIndex = (i + 1) % game.players.length;
			game.players[nextIndex].cards = hands[i];
		}
	}
}
