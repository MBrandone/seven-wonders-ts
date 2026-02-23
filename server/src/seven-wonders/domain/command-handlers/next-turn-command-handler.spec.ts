import { Card } from "../cards/card.value-object";
import { CardType } from "../cards/card-type";
import { Player } from "../player.entity";
import { SevenWondersGame } from "../seven-wonders-game";
import { NextTurnCommandHandler } from "./next-turn-command-handler";

describe("Quand on passe au tour suivant", () => {
	let game: SevenWondersGame;
	let alice: Player;
	let bob: Player;
	let charlie: Player;
	const mockedGameRepository = {
		findById: jest.fn((gameId: string) =>
			gameId === "game1" ? Promise.resolve(game) : Promise.resolve(null),
		),
		addGame: jest.fn<Promise<void>, [SevenWondersGame]>(),
	};
	const handler = new NextTurnCommandHandler(mockedGameRepository);

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

	it("Alors une erreur est levée si un des joueurs n'a pas joué de carte", async () => {
		// GIVEN
		alice.chooseCardToBePlayed("A");
		bob.chooseCardToBePlayed("C");

		// WHEN
		await expect(() => handler.handle({ gameId: "game1" }))
			// THEN
			.rejects.toThrow("Tous les joueurs doivent avoir joué une carte");
	});

	it("Alors la carte choisie est retirée du joueur et mise sur son plateau", async () => {
		// GIVEN
		alice.chooseCardToBePlayed("A");
		bob.chooseCardToBePlayed("C");
		charlie.chooseCardToBePlayed("E");

		// WHEN
		await handler.handle({ gameId: "game1" });

		// THEN
		expect(alice.board.length).toBe(1);
		expect(alice.board[0].name).toBe("A");

		expect(bob.board.length).toBe(1);
		expect(bob.board[0].name).toBe("C");

		expect(charlie.board.length).toBe(1);
		expect(charlie.board[0].name).toBe("E");
	});

	it("Alors les cartes en main passent d'un joueur à son voisin", async () => {
		// GIVEN
		alice.chooseCardToBePlayed("A");
		bob.chooseCardToBePlayed("C");
		charlie.chooseCardToBePlayed("E");

		// WHEN
		await handler.handle({ gameId: "game1" });

		// THEN
		expect(alice.cards.map((c) => c.name)).toEqual(["F"]);
		expect(bob.cards.map((c) => c.name)).toEqual(["B"]);
		expect(charlie.cards.map((c) => c.name)).toEqual(["D"]);
	});
});
