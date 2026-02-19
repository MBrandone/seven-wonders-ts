import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { Database } from "../../../database/database.types";
import { Game, GameReadModel } from "../../domain/read-models/game-read-model";

@Injectable()
export class SqlGameReadModel implements GameReadModel {
	constructor(@Inject("Kysely") private db: Kysely<Database>) {}

	async getById(gameId: string): Promise<Game | null> {
		const gameRow = await this.db
			.selectFrom("games")
			.selectAll()
			.where("id", "=", gameId)
			.executeTakeFirst();
		if (!gameRow) return null;
		const playerRows = await this.db
			.selectFrom("game_players")
			.innerJoin("players", "players.id", "game_players.player_id")
			.select(["players.id", "players.name"])
			.where("game_players.game_id", "=", gameId)
			.execute();
		const players = playerRows.map((p) => ({ id: p.id, name: p.name }));
		return {
			id: gameRow.id,
			created_at: gameRow.created_at,
			status: gameRow.status,
			max_players: gameRow.max_players,
			players,
		};
	}
}
