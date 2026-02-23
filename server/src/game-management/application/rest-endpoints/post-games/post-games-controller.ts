import { Body, Controller, Post } from "@nestjs/common";
import { CreateGameCommandHandler } from "../../../domain/command-handlers/create-game-command-handler";

@Controller("games")
export class PostGamesController {
	constructor(private readonly createGameHandler: CreateGameCommandHandler) {}

	@Post()
	async createGame(
		@Body("maxPlayers") maxPlayers: number,
		@Body("playerName") playerName: string,
	) {
		if (maxPlayers < 3 || maxPlayers > 7) {
			return { error: "maxPlayers doit être un nombre entre 3 et 7" };
		}
		if (!playerName) {
			return { error: "playerName est requis." };
		}
		const gameId = await this.createGameHandler.handle({
			maxPlayers,
			playerName,
		});
		return { id: gameId };
	}
}
