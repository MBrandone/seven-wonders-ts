import { GameFullError } from "./errors/game-full.error";
import { PlayerAlreadyInGameError } from "./errors/player-already-in-game.error";
import { Game } from "./game.entity";
import { GameStatus } from "./game-status.enum";

describe("Quand on utilise l'entité Game", () => {
	describe("Quand addPlayer est appelé alors que la partie est pleine", () => {
		it("Alors une GameFullError est levée", () => {
			// GIVEN
			const game = Game.hydrate(
				"g1",
				new Date(),
				3,
				["p1", "p2", "p3"],
				GameStatus.IN_PROGRESS,
			);

			// WHEN / THEN
			expect(() => game.addPlayer("p4")).toThrow(GameFullError);
		});
	});

	describe("Quand addPlayer est appelé avec un joueur déjà dans la partie", () => {
		it("Alors une PlayerAlreadyInGameError est levée", () => {
			// GIVEN
			const game = Game.create("g1", new Date(), 3, ["p1", "p2"]);

			// WHEN / THEN
			expect(() => game.addPlayer("p2")).toThrow(PlayerAlreadyInGameError);
		});
	});
});
