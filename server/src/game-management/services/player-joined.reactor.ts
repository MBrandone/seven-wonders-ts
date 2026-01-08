import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GameManagementGateway } from "../application/game-management.gateway";
import type { GameRepository } from "../domain/game-repository.interface";

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
