import { Controller, Get, Inject } from "@nestjs/common";
import { AvailableGamesReadModel } from "../../../domain/read-models/available-games-read-model";

@Controller("games")
export class GetAvailableGamesController {
	constructor(
		@Inject("AvailableGamesReadModel")
		private readonly availableGamesReadModel: AvailableGamesReadModel,
	) {}

	@Get()
	async listAvailableGames() {
		return this.availableGamesReadModel.list();
	}
}
