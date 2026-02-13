import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GameManagementService } from "../services/game-management.service";

@Controller("games")
export class GameManagementController {
	constructor(private readonly gameService: GameManagementService) {}

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
		return this.gameService.createGame(maxPlayers, playerName);
	}

	@Post(":gameId/players")
	async addPlayerToGame(
		@Param("gameId") gameId: string,
		@Body("playerName") playerName: string,
	) {
		if (!playerName) {
			return { error: "playerName est requis." };
		}
		return this.gameService.addPlayerToGame(gameId, playerName);
	}

	@Get()
	async listAvailableGames() {
		return this.gameService.listAvailableGames();
	}

	@Get(":gameId")
	async getGame(@Param("gameId") gameId: string) {
		return this.gameService.getGameWithPlayers(gameId);
	}
}
