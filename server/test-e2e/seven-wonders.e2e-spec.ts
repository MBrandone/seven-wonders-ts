import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { DummyGameRepository } from "../src/seven-wonders/infrastructure/dummy-game-repository";

describe("Seven Wonders (e2e)", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider("SevenWondersGameRepository")
			.useValue(new DummyGameRepository())
			.compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it("should return cards with playable status for a player", async () => {
		const playerName = "Alice";
		const response = await request(app.getHttpServer())
			.get(`/games/e2e/${playerName}`)
			.expect(200);

		expect(response.body).toBeDefined();

		expect(response.body).toHaveProperty("cards");
		expect(Array.isArray(response.body.cards)).toBe(true);

		expect(response.body.cards).toHaveLength(7);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		response.body.cards.forEach((card: any) => {
			expect(card).toHaveProperty("playability");
			expect(["YES", "NO", "WITH_PAYMENT"]).toContain(
				card.playability.playable,
			);
		});
	});
});
