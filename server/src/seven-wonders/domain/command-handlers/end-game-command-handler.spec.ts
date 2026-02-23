import { CivilianCard } from "../cards/civilian-card";
import { CommercialCard } from "../cards/commercial-card";
import { ScienceCard } from "../cards/science-card";
import { ScienceSymbol } from "../cards/science-symbol";
import { SevenWondersGameRepository } from "../game-repository";
import { MilitaryToken } from "../militaryToken";
import { Player } from "../player.entity";
import { PointCalculatorService } from "../point-calculator/point-calculator.service";
import { Resource } from "../resource";
import { SevenWondersGame } from "../seven-wonders-game";
import { Wonder, WonderStage } from "../wonders/wonder.entity";
import { EndGameCommandHandler } from "./end-game-command-handler";

describe("Quand la partie se termine", () => {
	let handler: EndGameCommandHandler;
	let gameRepository: jest.Mocked<SevenWondersGameRepository>;

	beforeEach(async () => {
		gameRepository = {
			findById: jest.fn(),
			save: jest.fn(),
		} as unknown as jest.Mocked<SevenWondersGameRepository>;

		handler = new EndGameCommandHandler(
			gameRepository,
			new PointCalculatorService(),
		);
	});

	it("Alors les points de victoire sont calculés correctement pour chaque joueur", async () => {
		// GIVEN
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

		// WHEN
		await handler.handle({ gameId: "game-123" });

		// THEN
		expect(player1.victoryPoints).toBe(28);
		expect(player2.victoryPoints).toBe(22);
	});
});
