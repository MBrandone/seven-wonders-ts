import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { CreateGameCommand } from "../commands/create-game-command";
import { Game } from "../game.entity";
import { Player } from "../player.entity";
import { GameRepository } from "../repositories/game-repository";
import { PlayerRepository } from "../repositories/player-repository";

export interface CreateGameResult {
	id: string;
	created_at: Date;
	status: string;
	max_players: number;
}

@Injectable()
export class CreateGameCommandHandler {
	constructor(
		@Inject("GameRepository")
		private readonly gameRepository: GameRepository,
		@Inject("PlayerRepository")
		private readonly playerRepository: PlayerRepository,
	) {}

	async handle(command: CreateGameCommand): Promise<CreateGameResult> {
		const id = uuidv4();
		const createdAt = new Date();
		let player = await this.playerRepository.findByName(command.playerName);
		if (!player) {
			player = new Player(uuidv4(), command.playerName, new Date());
			await this.playerRepository.createPlayer(player);
		}
		const game = Game.create(id, createdAt, command.maxPlayers, [player.id]);
		await this.gameRepository.save(game);

		// TODO vraiment besoin de return ?
		return {
			id: game.id,
			created_at: game.createdAt,
			status: game.status,
			max_players: game.maxPlayers,
		};
	}
}
