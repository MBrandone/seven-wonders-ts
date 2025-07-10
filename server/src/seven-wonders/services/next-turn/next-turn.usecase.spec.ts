import { Card } from "../../domain/cards/card.value-object";
import { CardType } from "../../domain/cards/card-type";
import { Player } from "../../domain/player.entity";
import { SevenWondersGame } from "../../domain/seven-wonders-game";
import { NextTurnUseCase } from "./next-turn.usecase";

describe("NextTurnUseCase", () => {
	let game: SevenWondersGame;
	let alice: Player;
	let bob: Player;
	let charlie: Player;
	const mockedGameRepository = {
		findById: jest.fn((gameId: string) =>
			gameId === "game1" ? Promise.resolve(game) : Promise.resolve(null),
		),
	};
	const usecase = new NextTurnUseCase(mockedGameRepository);

	beforeEach(() => {
		const aliceCards = [
			new Card("A", CardType.SCIENCE, 3, 1),
			new Card("B", CardType.SCIENCE, 3, 1),
		];
		alice = Player.create("1", "Alice");
		alice.takeCards(aliceCards);

		const bobCards = [
			new Card("C", CardType.SCIENCE, 3, 1),
			new Card("D", CardType.SCIENCE, 3, 1),
		];
		bob = Player.create("2", "Bob");
		bob.takeCards(bobCards);

		const charlieCards = [
			new Card("E", CardType.SCIENCE, 3, 1),
			new Card("F", CardType.SCIENCE, 3, 1),
		];
		charlie = Player.create("3", "Charlie");
		charlie.takeCards(charlieCards);

		game = new SevenWondersGame("game1", [alice, bob, charlie]);
	});

	it("lève une erreur si un des joueurs n'a pas joué de carte", async () => {
		// Given
		alice.chooseCardToBePlayed("A");
		bob.chooseCardToBePlayed("C");

		// When
		await expect(() => usecase.execute("game1"))

			// Then
			.rejects.toThrow("Tous les joueurs doivent avoir joué une carte");
	});

	it("retire la carte choisie du joueur, et la met sur son plateau", async () => {
		// Given
		alice.chooseCardToBePlayed("A");
		bob.chooseCardToBePlayed("C");
		charlie.chooseCardToBePlayed("E");

		// When
		await usecase.execute("game1");

		// Then
		expect(alice.board.length).toBe(1);
		expect(alice.board[0].name).toBe("A");

		expect(bob.board.length).toBe(1);
		expect(bob.board[0].name).toBe("C");

		expect(charlie.board.length).toBe(1);
		expect(charlie.board[0].name).toBe("E");
	});

	it("fait passer les cartes en main d'un joueur à son voisin", async () => {
		// Given
		alice.chooseCardToBePlayed("A");
		bob.chooseCardToBePlayed("C");
		charlie.chooseCardToBePlayed("E");

		// When
		await usecase.execute("game1");

		// Then
		// Alice doit avoir la main de Bob (D)
		expect(alice.cards.map((c) => c.name)).toEqual(["F"]);

		// Bob doit avoir la main de Charlie (F)
		expect(bob.cards.map((c) => c.name)).toEqual(["B"]);

		// Charlie doit avoir la main d'Alice (B)
		expect(charlie.cards.map((c) => c.name)).toEqual(["D"]);
	});
});
