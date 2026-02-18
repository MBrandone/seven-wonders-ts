import { AvailableGamesReadModel } from "../../../domain/read-models/available-games-read-model";
import { GetAvailableGamesController } from "./get-available-games-controller";

describe("Quand on appelle le controller pour lister les parties disponibles", () => {
	let controller: GetAvailableGamesController;
	let availableGamesReadModel: AvailableGamesReadModel;

	beforeEach(() => {
		availableGamesReadModel = {
			list: jest.fn(),
		};
		controller = new GetAvailableGamesController(availableGamesReadModel);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("Quand on liste les parties disponibles (GET /games)", () => {
		it("Alors le read model des parties disponibles est appelé et son résultat est renvoyé", async () => {
			// GIVEN
			const availableGames = [
				{
					id: "g1",
					created_at: new Date(),
					status: "waiting",
					max_players: 3,
					playerCount: 0,
				},
				{
					id: "g2",
					created_at: new Date(),
					status: "waiting",
					max_players: 7,
					playerCount: 3,
				},
			];
			jest
				.mocked(availableGamesReadModel.list)
				.mockResolvedValue(availableGames);

			// WHEN
			const result = await controller.listAvailableGames();

			// THEN
			expect(availableGamesReadModel.list).toHaveBeenCalled();
			expect(result).toHaveLength(2);
			expect(result[0]).toMatchObject({
				id: "g1",
				playerCount: 0,
				max_players: 3,
			});
			expect(result[1]).toMatchObject({
				id: "g2",
				playerCount: 3,
				max_players: 7,
			});
		});
	});
});
