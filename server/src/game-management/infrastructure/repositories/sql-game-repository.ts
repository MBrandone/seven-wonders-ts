import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { Database } from "../../../database/database.types";
import { Game } from "../../domain/game.entity";
import { GameStatus } from "../../domain/game-status.enum";
import { GameRepository } from "../../domain/repositories/game-repository";

@Injectable()
export class SqlGameRepository implements GameRepository {
	constructor(@Inject("Kysely") private db: Kysely<Database>) {}

	async findById(id: string): Promise<Game | null> {
		const gameRow = await this.db
			.selectFrom("games")
			.selectAll()
			.where("id", "=", id)
			.executeTakeFirst();
		if (!gameRow) return null;
		const players = await this.db
			.selectFrom("game_players")
			.select("player_id")
			.where("game_id", "=", id)
			.execute();
		return Game.hydrate(
			gameRow.id,
			gameRow.created_at,
			gameRow.max_players,
			players.map((p) => p.player_id),
			gameRow.status as GameStatus,
		);
	}

	async save(game: Game): Promise<void> {
		const existing = await this.findById(game.id);
		if (!existing) {
			await this.db
				.insertInto("games")
				.values({
					id: game.id,
					created_at: game.createdAt,
					status: game.status,
					max_players: game.maxPlayers,
				})
				.executeTakeFirst();
			for (const playerId of game.players) {
				await this.db
					.insertInto("game_players")
					.values({ game_id: game.id, player_id: playerId })
					.executeTakeFirst();
			}
			return;
		}
		await this.db
			.updateTable("games")
			.set({ status: game.status })
			.where("id", "=", game.id)
			.executeTakeFirst();
		const existingPlayerIds = await this.db
			.selectFrom("game_players")
			.select("player_id")
			.where("game_id", "=", game.id)
			.execute();
		const existingSet = new Set(existingPlayerIds.map((r) => r.player_id));
		for (const playerId of game.players) {
			if (!existingSet.has(playerId)) {
				await this.db
					.insertInto("game_players")
					.values({ game_id: game.id, player_id: playerId })
					.executeTakeFirst();
			}
		}
	}
}
