import type { GameRepository } from "../../domain/game-repository";

export class ChooseCardUseCase {
	constructor(private readonly gameRepository: GameRepository) {}

	async execute(
		gameId: string,
		playerId: string,
		cardName: string,
	): Promise<void> {
		// Trouver la partie
		const game = await this.gameRepository.findById(gameId);
		if (!game) throw new Error("Partie non trouvée");

		// Trouver le joueur
		const player = game.players.find((p) => p.id === playerId);
		if (!player) throw new Error("Joueur non trouvé");

		player.chooseCardToBePlayed(cardName);
	}
}
