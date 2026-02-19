import { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import type { Kysely } from "kysely";
import * as request from "supertest";
import type { Database } from "../src/database/database.types";
import { AppModule } from "../src/app.module";

describe("Quand une partie est créée et que deux joueurs supplémentaires rejoignent", () => {
	let app: INestApplication;
	let db: Kysely<Database>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		db = app.get<Kysely<Database>>("Kysely");
	});

	it("Alors la réponse API et les données en base reflètent une partie en cours avec 3 joueurs", async () => {
		// GIVEN
		const createRes = await request(app.getHttpServer())
			.post("/games")
			.send({ maxPlayers: 3, playerName: "Alice" })
			.expect(201);
		expect(createRes.body).toHaveProperty("id");
		const gameId = createRes.body.id;

		await request(app.getHttpServer())
			.post(`/games/${gameId}/players`)
			.send({ playerName: "Bob" })
			.expect(201);
		await request(app.getHttpServer())
			.post(`/games/${gameId}/players`)
			.send({ playerName: "Charlie" })
			.expect(201);

		// WHEN
		const getRes = await request(app.getHttpServer())
			.get(`/games/${gameId}`)
			.expect(200);

		// THEN
		expect(getRes.body.players.length).toBe(3);
		expect(getRes.body).toHaveProperty("status", "in_progress");

		const gameRow = await getGameDb(db, gameId);
		expect(gameRow).toBeDefined();
		expect(gameRow?.status).toBe("in_progress");
		expect(gameRow?.max_players).toBe(3);
		
		const gamePlayerRows = await getGamePlayersDb(db, gameId);
		expect(gamePlayerRows).toHaveLength(3);
		expect(new Set(gamePlayerRows.map((r) => r.player_id)).size).toBe(3);
		
		const playerRows = await getPlayersForGameDb(db, gameId);
		expect(playerRows).toHaveLength(3);
		expect(playerRows.map((p) => p.name).sort()).toEqual(
			["Alice", "Bob", "Charlie"].sort(),
		);
	});
});

async function getGameDb(db: Kysely<Database>, gameId: string) {
	return db
		.selectFrom("games")
		.selectAll()
		.where("id", "=", gameId)
		.executeTakeFirst();
}

async function getGamePlayersDb(db: Kysely<Database>, gameId: string) {
	return db
		.selectFrom("game_players")
		.selectAll()
		.where("game_id", "=", gameId)
		.execute();
}

async function getPlayersForGameDb(db: Kysely<Database>, gameId: string) {
	return db
		.selectFrom("game_players")
		.innerJoin("players", "players.id", "game_players.player_id")
		.select(["players.id", "players.name"])
		.where("game_players.game_id", "=", gameId)
		.execute();
}
