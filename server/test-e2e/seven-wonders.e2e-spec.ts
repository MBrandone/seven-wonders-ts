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
		// Créer une game Seven Wonders avec l'id "e2e" et 3 joueurs
		const player1 = Player.create("1", "Alice");
		const player2 = Player.create("2", "Bob");
		const player3 = Player.create("3", "Charlie");

		const game = new SevenWondersGame("e2e", [player1, player2, player3]);

		// Créer un repository en mémoire pour le test
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
		// Requêter l'endpoint board/e2e/player-name avec un des joueurs
		const playerName = "Alice";
		const response = await request(app.getHttpServer())
			.get(`/games/board/e2e/${playerName}`)
			.expect(200);

		// Vérifier que l'endpoint renvoie bien une 200 avec un body
		expect(response.body).toBeDefined();

		// Le body devra retourner un objet avec une clé carte qui est un tableau
		expect(response.body).toHaveProperty("cards");
		expect(Array.isArray(response.body.cards)).toBe(true);

		// Il y a 7 objets dans le tableau
		expect(response.body.cards).toHaveLength(7);

		// Pour chacun des objets, il y a une clé playable et les valeurs sont "YES", "NO" ou "WITH_PAYMENT"
		response.body.cards.forEach((card: any) => {
			expect(card).toHaveProperty("playable");
			expect(["YES", "NO", "WITH_PAYMENT"]).toContain(card.playable);
		});
	});
});
