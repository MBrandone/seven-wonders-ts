import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { v4 as uuidv4 } from "uuid";
import { JoinAnIncompleteGameCommand } from "../commands/join-an-incomplete-game-command";
import { Player } from "../player.entity";
import { GameRepository } from "../repositories/game-repository";
import { PlayerRepository } from "../repositories/player-repository";

@Injectable()
export class JoinAnIncompleteGameCommandHandler {
	constructor(
		@Inject("GameRepository")
		private readonly gameRepository: GameRepository,
		@Inject("PlayerRepository")
		private readonly playerRepository: PlayerRepository,
		private readonly eventEmitter: EventEmitter2,
	) {}

	async handle(command: JoinAnIncompleteGameCommand): Promise<void> {
		const game = await this.gameRepository.findById(command.gameId);
		if (!game) {
			throw new Error("Partie non trouvée");
		}

		let player = await this.playerRepository.findByName(command.playerName);
		if (!player) {
			player = new Player(uuidv4(), command.playerName, new Date());
			await this.playerRepository.createPlayer(player);
		}

		game.addPlayer(player.id);

		await this.gameRepository.save(game);
		this.eventEmitter.emit("player.joined", { gameId: command.gameId });
	}
}
