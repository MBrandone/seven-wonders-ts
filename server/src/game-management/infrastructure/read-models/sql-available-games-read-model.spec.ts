import { SqlAvailableGamesReadModel } from "./sql-available-games-read-model";

describe("Quand on liste les parties disponibles via SqlAvailableGamesReadModel", () => {
	it("Alors seules les parties en attente et non pleines sont renvoyées", async () => {
		// GIVEN
		const created_at = new Date("2025-01-15T10:00:00Z");
		const gameRows = [
			{
				id: "g1",
				created_at,
				status: "waiting",
				max_players: 3,
			},
			{
				id: "g2",
				created_at,
				status: "waiting",
				max_players: 7,
			},
		];
		const playerCounts = [
			{ game_id: "g1" },
			{ game_id: "g2" },
			{ game_id: "g2" },
			{ game_id: "g2" },
		];
		const mockExecuteGames = jest.fn().mockResolvedValue(gameRows);
		const mockExecutePlayerCounts = jest.fn().mockResolvedValue(playerCounts);
		const db = {
			selectFrom: jest.fn((table: string) => {
				if (table === "games") {
					return {
						selectAll: jest.fn().mockReturnValue({
							where: jest.fn().mockReturnValue({
								execute: mockExecuteGames,
							}),
						}),
					};
				}
				return {
					select: jest.fn().mockReturnValue({
						where: jest.fn().mockReturnValue({
							execute: mockExecutePlayerCounts,
						}),
					}),
				};
			}),
		};
		const readModel = new SqlAvailableGamesReadModel(db as never);

		// WHEN
		const result = await readModel.list();

		// THEN
		expect(result).toHaveLength(2);
		expect(result[0]).toEqual({
			id: "g1",
			created_at,
			status: "waiting",
			max_players: 3,
			playerCount: 1,
		});
		expect(result[1]).toEqual({
			id: "g2",
			created_at,
			status: "waiting",
			max_players: 7,
			playerCount: 3,
		});
	});

	it("Alors les parties pleines sont exclues de la liste", async () => {
		// GIVEN
		const created_at = new Date();
		const gameRows = [
			{ id: "g1", created_at, status: "waiting", max_players: 3 },
		];
		const playerCounts = [
			{ game_id: "g1" },
			{ game_id: "g1" },
			{ game_id: "g1" },
		];
		const mockExecuteGames = jest.fn().mockResolvedValue(gameRows);
		const mockExecutePlayerCounts = jest.fn().mockResolvedValue(playerCounts);
		const db = {
			selectFrom: jest.fn((table: string) => {
				if (table === "games") {
					return {
						selectAll: jest.fn().mockReturnValue({
							where: jest.fn().mockReturnValue({
								execute: mockExecuteGames,
							}),
						}),
					};
				}
				return {
					select: jest.fn().mockReturnValue({
						where: jest.fn().mockReturnValue({
							execute: mockExecutePlayerCounts,
						}),
					}),
				};
			}),
		};
		const readModel = new SqlAvailableGamesReadModel(db as never);

		// WHEN
		const result = await readModel.list();

		// THEN
		expect(result).toHaveLength(0);
	});

	it("Alors une liste vide est renvoyée lorsqu'il n'y a aucune partie en attente", async () => {
		// GIVEN
		const mockExecuteGames = jest.fn().mockResolvedValue([]);
		const db = {
			selectFrom: jest.fn(() => ({
				selectAll: jest.fn().mockReturnValue({
					where: jest.fn().mockReturnValue({
						execute: mockExecuteGames,
					}),
				}),
			})),
		};
		const readModel = new SqlAvailableGamesReadModel(db as never);

		// WHEN
		const result = await readModel.list();

		// THEN
		expect(result).toEqual([]);
	});
});
