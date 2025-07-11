import type { GameRepository } from "../../domain/game-repository";

export class ChooseCardUseCase {
	constructor(private readonly gameRepository: GameRepository) {}

	async execute(
		gameId: string,
		playerId: string,
		cardName: string,
	): Promise<void> {
		const game = await this.gameRepository.findById(gameId);
		if (!game) throw new Error("Partie non trouvée");

		const player = game.players.find((player) => player.id === playerId);
		if (!player) throw new Error("Joueur non trouvé");

		player.chooseCardToBePlayed(cardName);
	}
}
