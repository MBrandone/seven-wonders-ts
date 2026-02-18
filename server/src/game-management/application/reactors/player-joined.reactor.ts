import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GameRepository } from "../../domain/repositories/game-repository";
import { GameManagementGateway } from "../game-management.gateway";

@Injectable()
export class PlayerJoinedReactor {
	constructor(
		@Inject("GameRepository")
		private readonly gameRepository: GameRepository,
		private readonly gameGateway: GameManagementGateway,
	) {}

	@OnEvent("player.joined")
	async handlePlayerJoined(payload: { gameId: string }) {
		const game = await this.gameRepository.findById(payload.gameId);
		if (game && !game.canAddPlayer()) {
			this.gameGateway.emitGameFull(game.id);
		}
	}
}
