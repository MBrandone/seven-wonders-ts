import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { CreateGameCommand } from "../commands/create-game-command";
import { Game } from "../game.entity";
import { Player } from "../player.entity";
import { GameRepository } from "../repositories/game-repository";
import { PlayerRepository } from "../repositories/player-repository";

@Injectable()
export class CreateGameCommandHandler {
	constructor(
		@Inject("GameRepository")
		private readonly gameRepository: GameRepository,
		@Inject("PlayerRepository")
		private readonly playerRepository: PlayerRepository,
	) {}

	async handle(command: CreateGameCommand): Promise<string> {
		const id = uuidv4();
		const createdAt = new Date();
		let player = await this.playerRepository.findByName(command.playerName);
		if (!player) {
			player = new Player(uuidv4(), command.playerName, new Date());
			await this.playerRepository.createPlayer(player);
		}
		const game = Game.create(id, createdAt, command.maxPlayers, [player.id]);
		await this.gameRepository.save(game);
		return game.id;
	}
}
