import { ALL_CARDS } from "../cards/all-cards/all-cards";
import { Card } from "../cards/card.value-object";
import { CardType } from "../cards/card-type";
import { Deck } from "../deck/deck.entity";
import { SevenWondersGameRepository } from "../game-repository";
import { Player } from "../player.entity";
import { SevenWondersGame } from "../seven-wonders-game";
import { NextAgeCommandHandler } from "./next-age-command-handler";

describe("Quand on passe à l'âge suivant", () => {
	let p1: Player;
	let p2: Player;
	let p3: Player;
	let game: SevenWondersGame;
	let deck: Deck;
	let mockedGameRepository: SevenWondersGameRepository;

	beforeEach(() => {
		const p1Board = [
			new Card("Caserne", CardType.MILITARY, 3, 1),
			new Card("Tour de garde", CardType.MILITARY, 3, 1),
		];
		p1 = Player.hydrate({
			id: "1",
			name: "Alice",
			cards: [],
			board: p1Board,
			coins: 0,
			militaryTokens: [],
		});

		const p2Board = [new Card("Caserne", CardType.MILITARY, 3, 1)];
		p2 = Player.hydrate({
			id: "2",
			name: "Bob",
			cards: [],
			board: p2Board,
			coins: 0,
			militaryTokens: [],
		});

		p3 = Player.hydrate({
			id: "3",
			name: "Charlie",
			cards: [],
			board: [],
			coins: 0,
			militaryTokens: [],
		});
		const players = [p1, p2, p3];

		deck = new Deck(ALL_CARDS);
		game = new SevenWondersGame("game1", players);
		game.assignCards(deck);
		mockedGameRepository = {
			findById: jest.fn((gameId: string) =>
				gameId === "game1" ? Promise.resolve(game) : Promise.resolve(null),
			),
			addGame: jest.fn<Promise<void>, [SevenWondersGame]>(),
		};
	});

	it("Alors les jetons de guerre sont attribués correctement", async () => {
		// WHEN
		const handler = new NextAgeCommandHandler(mockedGameRepository);
		await handler.handle({ gameId: "game1" });

		// THEN
		expect(game.currentAge).toBe(2);
		expect(p1.warVictoryTokens).toBe(2);
		expect(p1.warDefeatTokens).toBe(0);
		expect(p2.warVictoryTokens).toBe(1);
		expect(p2.warDefeatTokens).toBe(1);
		expect(p3.warVictoryTokens).toBe(0);
		expect(p3.warDefeatTokens).toBe(2);
	});

	it("Alors 7 cartes sont distribuées à chaque joueur", async () => {
		// WHEN
		const handler = new NextAgeCommandHandler(mockedGameRepository);
		await handler.handle({ gameId: "game1" });

		// THEN
		for (const p of game.players) {
			expect(p.cards.length).toBe(7);
		}
	});
});
