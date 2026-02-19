import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { Database } from "../../../database/database.types";
import {
	AvailableGame,
	AvailableGamesReadModel,
} from "../../domain/read-models/available-games-read-model";

@Injectable()
export class SqlAvailableGamesReadModel implements AvailableGamesReadModel {
	constructor(@Inject("Kysely") private db: Kysely<Database>) {}

	async list(): Promise<AvailableGame[]> {
		const gameRows = await this.db
			.selectFrom("games")
			.selectAll()
			.where("status", "=", "waiting")
			.execute();
		if (gameRows.length === 0) return [];
		const gameIds = gameRows.map((r) => r.id);
		const playerCounts = await this.db
			.selectFrom("game_players")
			.select("game_id")
			.where("game_id", "in", gameIds)
			.execute();
		const countByGameId = playerCounts.reduce<Record<string, number>>(
			(acc, row) => {
				acc[row.game_id] = (acc[row.game_id] ?? 0) + 1;
				return acc;
			},
			{},
		);
		return gameRows
			.map(
				(row): AvailableGame => ({
					id: row.id,
					created_at: row.created_at,
					status: row.status,
					max_players: row.max_players,
					playerCount: countByGameId[row.id] ?? 0,
				}),
			)
			.filter((item) => item.playerCount < item.max_players);
	}
}
