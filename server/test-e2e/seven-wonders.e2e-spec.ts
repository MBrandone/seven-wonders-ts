import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { Player } from "../src/seven-wonders/domain/player.entity";
import { SevenWondersGame } from "../src/seven-wonders/domain/seven-wonders-game";
import { StartGameUseCase } from "../src/seven-wonders/services/start-game/start-game.usecase";
import type { SevenWondersGameRepository } from "../src/seven-wonders/domain/game-repository";

describe("Seven Wonders (e2e)", () => {
	let app: INestApplication;
	let gameRepository: SevenWondersGameRepository;

	beforeEach(async () => {
		const player1 = Player.create("1", "Alice");
		const player2 = Player.create("2", "Bob");
		const player3 = Player.create("3", "Charlie");

		const game = new SevenWondersGame("e2e", [player1, player2, player3]);

		const games: SevenWondersGame[] = [];
		gameRepository = {
			addGame: async (game: SevenWondersGame) => {
				games.push(game);
			},
			findById: async (gameId: string) => {
				return games.find((g) => g.id === gameId) || null;
			},
		};

		await gameRepository.addGame(game);

		// Démarrer la game (assigner les merveilles et les cartes)
		const startGameUseCase = new StartGameUseCase(gameRepository);
		await startGameUseCase.execute("e2e");

		// Créer le module de test avec le repository injecté
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		})
			.overrideProvider("SevenWondersGameRepository")
			.useValue(gameRepository)
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

		response.body.cards.forEach((card: any) => {
			expect(card).toHaveProperty("playable");
			expect(["YES", "NO", "WITH_PAYMENT"]).toContain(card.playable);
		});
	});
});
