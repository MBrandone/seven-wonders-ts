import { Player } from "../player.entity";
import { SevenWondersGame } from "../seven-wonders-game";
import { StartGameCommandHandler } from "./start-game-command-handler";

describe("Quand on démarre une partie", () => {
	let handler: StartGameCommandHandler;
	const mockedGameRepository = {
		findById: jest.fn<Promise<SevenWondersGame>, [string]>(),
		addGame: jest.fn<Promise<void>, [SevenWondersGame]>(),
	};

	beforeEach(() => {
		handler = new StartGameCommandHandler(mockedGameRepository);
	});

	it("Alors chaque joueur se voit attribuer une merveille différente au hasard et 7 cartes", async () => {
		// GIVEN
		const alice = Player.create("1", "Alice");
		const bob = Player.create("2", "Bob");
		const charlie = Player.create("3", "Charlie");
		const players = [alice, bob, charlie];
		const game = new SevenWondersGame("id", players);
		mockedGameRepository.findById.mockResolvedValue(game);

		// WHEN
		const sevenWondersGame = await handler.handle({ gameId: "id" });

		// THEN
		expect(
			sevenWondersGame.players.every((player) => player.board !== undefined),
		).toBe(true);
		expect(
			sevenWondersGame.players.every((player) => player.cards.length === 7),
		).toBe(true);
	});
});
