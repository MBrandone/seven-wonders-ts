import { Card } from "../../../domain/cards/card.value-object";
import { CommercialCard } from "../../../domain/cards/commercial-card";
import { CardType } from "../../../domain/cards/card-type";
import { CivilianCard } from "../../../domain/cards/civilian-card";
import { ScienceCard } from "../../../domain/cards/science-card";
import { ScienceSymbol } from "../../../domain/cards/science-symbol";
import type { SevenWondersGameRepository } from "../../../domain/game-repository";
import { MilitaryToken } from "../../../domain/militaryToken";
import { Player } from "../../../domain/player.entity";
import { Resource } from "../../../domain/resource";
import { SevenWondersGame } from "../../../domain/seven-wonders-game";
import { Wonder, WonderStage } from "../../../domain/wonders/wonder.entity";
import { PointCalculatorService } from "../../point-calculator/point-calculator.service";
import { EndGameUsecase } from "./end-game.usecase";

describe("EndGameUsecase", () => {
	let usecase: EndGameUsecase;
	let gameRepository: jest.Mocked<SevenWondersGameRepository>;

	beforeEach(async () => {
		gameRepository = {
			findById: jest.fn(),
			save: jest.fn(),
		} as unknown as jest.Mocked<SevenWondersGameRepository>;

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
		// - Guildes: à rajouter un jour, 0 pour l'instant
		// Total: 28
		expect(player1.victoryPoints).toBe(28);

		// Points de Player2:
		// - Merveille: 10 (2 + 3 + 5)
		// - Pièces: 2 (7 / 3 = 2.33 → 2)
		// - Militaire: 3 (5 - 1 - 1)
		// - Cartes bleues: 2
		// - Cartes jaunes: 0
		// - Science: 5 (2² + 1² + 0² = 5) + 0 (pas de set complet)
		// - Guildes: à rajouter un jour, 0 pour l'instant
		// Total: 22
		expect(player2.victoryPoints).toBe(22);
	});
});
