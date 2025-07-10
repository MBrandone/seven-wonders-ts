import { Player } from "../../domain/player.entity";
import { SevenWondersGame } from "../../domain/seven-wonders-game";
import { StartGameUseCase } from "./start-game.usecase";

describe("StartGameUseCase", () => {
	let usecase: StartGameUseCase;
	const mockedGameRepository = {
		findById: jest.fn<Promise<SevenWondersGame>, [string]>(),
	};

	beforeEach(() => {
		usecase = new StartGameUseCase(mockedGameRepository);
	});

	it("Quand je démarre une partie, chaque joueur se voit attribuer une merveille différente au hasard et 7 cartes", async () => {
		// Given
		const alice = Player.create("1", "Alice");
		const bob = Player.create("2", "Bob");
		const charlie = Player.create("3", "Charlie");
		const players = [alice, bob, charlie];
		const game = new SevenWondersGame("id", players);
		mockedGameRepository.findById.mockResolvedValue(game);

		// When
		const sevenWondersGame = await usecase.execute("id");

		// Then
		expect(
			sevenWondersGame.players.every((player) => player.board != undefined),
		).toBe(true);
		expect(
			sevenWondersGame.players.every((player) => player.cards.length === 7),
		).toBe(true);
	});
});
