import {
	Controller,
	Get,
	Inject,
	NotFoundException,
	Param,
} from "@nestjs/common";
import { GameReadModel } from "../../../domain/read-models/game-read-model";

@Controller("games")
export class GetGamesIdController {
	constructor(
		@Inject("GameReadModel")
		private readonly gameReadModel: GameReadModel,
	) {}

	@Get(":gameId")
	async getGame(@Param("gameId") gameId: string) {
		const game = await this.gameReadModel.getById(gameId);
		if (!game) {
			throw new NotFoundException("Partie non trouvée");
		}
		return game;
	}
}
