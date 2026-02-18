import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from "@nestjs/common";
import { JoinAnIncompleteGameCommandHandler } from "../../../domain/command-handlers/join-an-incomplete-game-command-handler";

@Controller("games")
export class PostGamesIdPlayerController {
	constructor(
		private readonly joinAnIncompleteGameHandler: JoinAnIncompleteGameCommandHandler,
	) {}

	@Post(":gameId/players")
	@HttpCode(HttpStatus.CREATED)
	async addPlayerToGame(
		@Param("gameId") gameId: string,
		@Body("playerName") playerName: string,
	) {
		if (!playerName) {
			return { error: "playerName est requis." };
		}
		await this.joinAnIncompleteGameHandler.handle({ gameId, playerName });
		return {};
	}
}
