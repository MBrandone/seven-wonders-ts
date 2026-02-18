import { SqlGameReadModel } from "./sql-game-read-model";

describe("Quand on récupère une partie par son id via SqlGameReadModel", () => {
	it("Alors la partie avec la liste des joueurs est renvoyée", async () => {
		// GIVEN
		const created_at = new Date("2025-01-15T10:00:00Z");
		const gameRow = {
			id: "g1",
			created_at,
			status: "waiting",
			max_players: 3,
		};
		const playerRows = [
			{ id: "p1", name: "Alice" },
			{ id: "p2", name: "Bob" },
		];
		const mockExecuteTakeFirst = jest.fn().mockResolvedValue(gameRow);
		const mockExecutePlayers = jest.fn().mockResolvedValue(playerRows);
		const db = {
			selectFrom: jest.fn((table: string) => {
				if (table === "games") {
					return {
						selectAll: jest.fn().mockReturnValue({
							where: jest.fn().mockReturnValue({
								executeTakeFirst: mockExecuteTakeFirst,
							}),
						}),
					};
				}
				return {
					innerJoin: jest.fn().mockReturnValue({
						select: jest.fn().mockReturnValue({
							where: jest.fn().mockReturnValue({
								execute: mockExecutePlayers,
							}),
						}),
					}),
				};
			}),
		};
		const readModel = new SqlGameReadModel(db as never);

		// WHEN
		const result = await readModel.getById("g1");

		// THEN
		expect(result).toEqual({
			id: "g1",
			created_at,
			status: "waiting",
			max_players: 3,
			players: [
				{ id: "p1", name: "Alice" },
				{ id: "p2", name: "Bob" },
			],
		});
	});

	it("Alors null est renvoyé lorsque la partie n'existe pas", async () => {
		// GIVEN
		const mockExecuteTakeFirst = jest.fn().mockResolvedValue(undefined);
		const db = {
			selectFrom: jest.fn(() => ({
				selectAll: jest.fn().mockReturnValue({
					where: jest.fn().mockReturnValue({
						executeTakeFirst: mockExecuteTakeFirst,
					}),
				}),
			})),
		};
		const readModel = new SqlGameReadModel(db as never);

		// WHEN
		const result = await readModel.getById("inconnu");

		// THEN
		expect(result).toBeNull();
	});
});
