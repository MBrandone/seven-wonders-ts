import { scriptorium1 } from "../cards/all-cards/science";
import { Player } from "../player.entity";
import { SevenWondersGame } from "../seven-wonders-game";
import { ChooseCardCommandHandler } from "./choose-card-command-handler";

describe("Quand un joueur choisit une carte", () => {
	const mockedGameRepository = {
		findById: jest.fn((gameId: string) =>
			gameId === "game1" ? Promise.resolve(game) : Promise.resolve(null),
		),
		addGame: jest.fn<Promise<void>, [SevenWondersGame]>(),
	};

	const alice = Player.create("1", "Alice");
	alice.takeCards([scriptorium1]);
	const game = new SevenWondersGame("game1", [alice]);

	const handler = new ChooseCardCommandHandler(mockedGameRepository);

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("Alors une erreur est levée si la partie, le joueur ou la carte est inconnue", async () => {
		// WHEN / THEN
		await expect(() =>
			handler.handle({
				gameId: "unknown_game",
				playerId: "1",
				cardName: "Scriptorium",
			}),
		).rejects.toThrow("Partie non trouvée");
		await expect(() =>
			handler.handle({
				gameId: "game1",
				playerId: "2",
				cardName: "Scriptorium",
			}),
		).rejects.toThrow("Joueur non trouvé");
		await expect(() =>
			handler.handle({
				gameId: "game1",
				playerId: "1",
				cardName: "Carte inconnue",
			}),
		).rejects.toThrow("Le joueur ne possède pas cette carte dans sa main");
	});

	it("Alors une erreur est levée si le joueur ne possède pas la carte dans sa main", async () => {
		// WHEN
		await expect(() =>
			handler.handle({
				gameId: "game1",
				playerId: "1",
				cardName: "Atelier",
			}),
		)
			// THEN
			.rejects.toThrow("Le joueur ne possède pas cette carte dans sa main");
	});

	it("Alors la carte est déplacée de la main du joueur vers son plateau si tout est correct", async () => {
		// WHEN
		await handler.handle({
			gameId: "game1",
			playerId: "1",
			cardName: "Scriptorium",
		});

		// THEN
		expect(alice.hasChosenCard()).toBe(true);
	});
});
