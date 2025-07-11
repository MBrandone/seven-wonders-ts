import { Card, CommercialCard } from "../../domain/cards/card.value-object";
import { CardType } from "../../domain/cards/card-type";
import { CivilianCard } from "../../domain/cards/civilian-card";
import { ScienceCard } from "../../domain/cards/science-card";
import { ScienceSymbol } from "../../domain/cards/science-symbol";
import type { GameRepository } from "../../domain/game-repository";
import { MilitaryToken } from "../../domain/militaryToken";
import { Player } from "../../domain/player.entity";
import { Resource } from "../../domain/resource";
import { SevenWondersGame } from "../../domain/seven-wonders-game";
import { Wonder, WonderStage } from "../../domain/wonder.entity";
import { PointCalculatorService } from "../point-calculator/point-calculator.service";
import { EndGameUsecase } from "./end-game.usecase";

describe("EndGameUsecase", () => {
	let usecase: EndGameUsecase;
	let gameRepository: jest.Mocked<GameRepository>;

	beforeEach(async () => {
		gameRepository = {
			findById: jest.fn(),
			save: jest.fn(),
		} as unknown as jest.Mocked<GameRepository>;

		usecase = new EndGameUsecase(gameRepository, new PointCalculatorService());
	});

	it("should calculate victory points correctly for each player", async () => {
		// Given
		const player1 = Player.hydrate({
			id: "id1",
			name: "Player1",
			cards: [],
			board: [
				new CivilianCard("", 1, 1, 3),
				new CivilianCard("", 1, 1, 5),
				new ScienceCard("", 1, 1, ScienceSymbol.TABLET),
				new ScienceCard("", 1, 1, ScienceSymbol.COMPASS),
				new CommercialCard(
					"one name",
					1,
					1,
					() => 2,
					() => 0,
				),
				new Card("one name", CardType.GUILD, 1, 1, 4),
			],
			coins: 10,
			militaryTokens: [
				new MilitaryToken(1),
				new MilitaryToken(3),
				new MilitaryToken(-1),
			],
		});

		const player2 = Player.hydrate({
			id: "id1",
			name: "Player2",
			cards: [],
			board: [
				new CivilianCard("", 1, 1, 2),
				new ScienceCard("", 1, 1, ScienceSymbol.TABLET),
				new ScienceCard("", 1, 1, ScienceSymbol.TABLET),
				new ScienceCard("", 1, 1, ScienceSymbol.WHEEL),
				new Card("one name", CardType.GUILD, 1, 1, 3),
			],
			coins: 7,
			militaryTokens: [
				new MilitaryToken(-1),
				new MilitaryToken(-1),
				new MilitaryToken(5),
			],
		});

		player1.wonder = new Wonder("Wonder", Resource.ARGILE, [
			new WonderStage(true, 3),
			new WonderStage(true, 0),
			new WonderStage(true, 7),
		]);
		player2.wonder = new Wonder("Wonder", Resource.ARGILE, [
			new WonderStage(true, 2),
			new WonderStage(true, 3),
			new WonderStage(true, 5),
		]);

		const game = new SevenWondersGame("game1", [player1, player2]);

		gameRepository.findById.mockResolvedValue(game);

		// When
		await usecase.execute("game-123");

		// Then

		// Points de Player1:
		// - Merveille: 10 (3 + 0 + 7)
		// - Pièces: 3 (10 / 3 = 3.33 → 3)
		// - Militaire: 3 (1 + 3 - 1)
		// - Cartes bleues: 8 (3 + 5)
		// - Cartes jaunes: 2
		// - Science: 2 (1² + 1² = 2) + 0 (pas de set complet)
		// - Guildes: 4
		// Total: 32
		expect(player1.victoryPoints).toBe(32);

		// Points de Player2:
		// - Merveille: 10 (2 + 3 + 5)
		// - Pièces: 2 (7 / 3 = 2.33 → 2)
		// - Militaire: 3 (5 - 1 - 1)
		// - Cartes bleues: 2
		// - Cartes jaunes: 0
		// - Science: 5 (2² + 1² + 0² = 5) + 0 (pas de set complet)
		// - Guildes: 3
		// Total: 25
		expect(player2.victoryPoints).toBe(25);
	});
});
