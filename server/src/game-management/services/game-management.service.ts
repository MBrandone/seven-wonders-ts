import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { v4 as uuidv4 } from "uuid";
import { Game } from "../domain/game.entity";
import type { GameRepository } from "../domain/game-repository.interface";
import { Player } from "../domain/player.entity";
import type { PlayerRepository } from "../domain/player-repository.interface";

@Injectable()
export class GameManagementService {
	constructor(
		@Inject("GameRepository")
		private readonly gameRepository: GameRepository,
		@Inject("PlayerRepository")
		private readonly playerRepository: PlayerRepository,
		private readonly eventEmitter: EventEmitter2,
	) {}

	async createGame(maxPlayers: number, playerName: string) {
		const id = uuidv4();
		const createdAt = new Date();
		let player = await this.playerRepository.findByName(playerName);
		if (!player) {
			player = new Player(uuidv4(), playerName, new Date());
			await this.playerRepository.createPlayer(player);
		}
		const game = Game.create(id, createdAt, maxPlayers, [player.id]);
		await this.gameRepository.createGame(game, player);
		return {
			id: game.id,
			created_at: game.createdAt,
			status: game.status,
			max_players: game.maxPlayers,
		};
	}

	async addPlayerToGame(gameId: string, playerName: string) {
		const game = await this.gameRepository.findById(gameId);
		if (!game) {
			throw new Error("Partie non trouvée");
		}

		if (!game.canAddPlayer()) {
			throw new Error("Nombre maximum de joueurs atteint pour cette partie");
		}

		let player = await this.playerRepository.findByName(playerName);
		if (!player) {
			player = new Player(uuidv4(), playerName, new Date());
			await this.playerRepository.createPlayer(player);
		}

		game.addPlayer(player.id);

		const result = await this.gameRepository.addPlayerToGame(game, player.id);
		this.eventEmitter.emit("player.joined", { gameId });
		return result;
	}

	async listAvailableGames() {
		const games = await this.gameRepository.findWaitingGames();
		return games
			.map((game) => ({
				id: game.id,
				created_at: game.createdAt,
				status: game.status,
				max_players: game.maxPlayers,
				playerCount: game.players.length,
			}))
			.filter((g) => g.playerCount < g.max_players);
	}

	async getGameWithPlayers(gameId: string) {
		const game = await this.gameRepository.findById(gameId);
		if (!game) {
			throw new Error("Partie non trouvée");
		}

		const players = await Promise.all(
			game.players.map(async (playerId: string) => {
				const player = await this.playerRepository.findById(playerId);
				return player ? { id: player.id, name: player.name } : null;
			}),
		);

		return {
			id: game.id,
			created_at: game.createdAt,
			status: game.status,
			max_players: game.maxPlayers,
			players: players.filter(Boolean),
		};
	}
}
