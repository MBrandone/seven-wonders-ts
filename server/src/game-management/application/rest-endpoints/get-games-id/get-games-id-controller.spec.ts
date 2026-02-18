import { GameReadModel } from "../../../domain/read-models/game-read-model";
import { GetGamesIdController } from "./get-games-id-controller";

describe("Quand on appelle le controller pour récupérer une partie par id", () => {
	let controller: GetGamesIdController;
	let gameReadModel: GameReadModel;

	beforeEach(() => {
		gameReadModel = {
			getById: jest.fn(),
		};
		controller = new GetGamesIdController(gameReadModel);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("Quand on récupère une partie par son id (GET /games/:gameId)", () => {
		it("Alors le read model de partie est appelé et la partie avec les joueurs est renvoyée", async () => {
			// GIVEN
			const gameReadModelItem = {
				id: "g1",
				created_at: new Date(),
				status: "waiting",
				max_players: 3,
				players: [
					{ id: "p1", name: "Alice" },
					{ id: "p2", name: "Bob" },
				],
			};
			jest.mocked(gameReadModel.getById).mockResolvedValue(gameReadModelItem);

			// WHEN
			const result = await controller.getGame("g1");

			// THEN
			expect(gameReadModel.getById).toHaveBeenCalledWith("g1");
			expect(result).toMatchObject({
				id: "g1",
				max_players: 3,
				players: [
					{ id: "p1", name: "Alice" },
					{ id: "p2", name: "Bob" },
				],
			});
		});

		it("Alors une erreur est levée si la partie n'existe pas", async () => {
			// GIVEN
			jest.mocked(gameReadModel.getById).mockResolvedValue(null);

			// WHEN / THEN
			await expect(controller.getGame("inconnu")).rejects.toThrow(
				"Partie non trouvée",
			);
		});
	});
});
