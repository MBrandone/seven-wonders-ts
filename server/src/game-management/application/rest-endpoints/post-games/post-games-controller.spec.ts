import { CreateGameCommandHandler } from "src/game-management/domain/command-handlers/create-game-command-handler";
import { PostGamesController } from "./post-games-controller";

describe("Quand on appelle le controller pour créer une partie", () => {
	let controller: PostGamesController;
	let createGameHandler: Pick<CreateGameCommandHandler, "handle">;

	beforeEach(() => {
		createGameHandler = {
			handle: jest.fn(),
		};
		controller = new PostGamesController(
			createGameHandler as CreateGameCommandHandler,
		);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("Quand on crée une partie (POST /games)", () => {
		it("Alors le handler est appelé avec maxPlayers et playerName et son résultat est renvoyé", async () => {
			// GIVEN
			const createdGame = {
				id: "g1",
				created_at: new Date(),
				status: "waiting",
				max_players: 3,
			};
			jest.mocked(createGameHandler.handle).mockResolvedValue(createdGame);

			// WHEN
			const result = await controller.createGame(3, "Alice");

			// THEN
			expect(createGameHandler.handle).toHaveBeenCalledWith({
				maxPlayers: 3,
				playerName: "Alice",
			});
			expect(result).toEqual(createdGame);
		});

		it("Alors une erreur est renvoyée si maxPlayers est inférieur à 3", async () => {
			// WHEN
			const result = await controller.createGame(2, "Alice");

			// THEN
			expect(createGameHandler.handle).not.toHaveBeenCalled();
			expect(result).toEqual({
				error: "maxPlayers doit être un nombre entre 3 et 7",
			});
		});

		it("Alors une erreur est renvoyée si maxPlayers est supérieur à 7", async () => {
			// WHEN
			const result = await controller.createGame(8, "Alice");

			// THEN
			expect(createGameHandler.handle).not.toHaveBeenCalled();
			expect(result).toEqual({
				error: "maxPlayers doit être un nombre entre 3 et 7",
			});
		});

		it("Alors une erreur est renvoyée si playerName est absent", async () => {
			// WHEN
			const result = await controller.createGame(3, "");

			// THEN
			expect(createGameHandler.handle).not.toHaveBeenCalled();
			expect(result).toEqual({ error: "playerName est requis." });
		});
	});
});
