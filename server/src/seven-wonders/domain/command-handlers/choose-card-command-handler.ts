import { ChooseCardCommand } from "../commands/choose-card-command";
import { SevenWondersGameRepository } from "../game-repository";

export class ChooseCardCommandHandler {
	constructor(private readonly gameRepository: SevenWondersGameRepository) {}

	async handle(command: ChooseCardCommand): Promise<void> {
		const game = await this.gameRepository.findById(command.gameId);
		if (!game) throw new Error("Partie non trouvée");

		const player = game.players.find((p) => p.id === command.playerId);
		if (!player) throw new Error("Joueur non trouvé");

		player.chooseCardToBePlayed(command.cardName);
	}
}
