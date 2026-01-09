import type { SevenWondersGameRepository } from "src/seven-wonders/domain/game-repository";
import { ALL_CARDS } from "../../../domain/cards/all-cards/all-cards";
import { Card } from "../../../domain/cards/card.value-object";
import { CardType } from "../../../domain/cards/card-type";
import { Deck } from "../../../domain/deck/deck.entity";
import { Player } from "../../../domain/player.entity";
import { SevenWondersGame } from "../../../domain/seven-wonders-game";
import { NextAgeUseCase } from "./next-age.usecase";

describe("NextAgeUseCase", () => {
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

	it("attribue les jetons de guerre correctement", async () => {
		// When
		const usecase = new NextAgeUseCase(mockedGameRepository);
		await usecase.execute("game1");

		// Then
		expect(game.currentAge).toBe(2);
		expect(p1.warVictoryTokens).toBe(2);
		expect(p1.warDefeatTokens).toBe(0);
		expect(p2.warVictoryTokens).toBe(1);
		expect(p2.warDefeatTokens).toBe(1);
		expect(p3.warVictoryTokens).toBe(0);
		expect(p3.warDefeatTokens).toBe(2);
	});

	it(" distribue 7 cartes à chaque joueur", async () => {
		// When
		const usecase = new NextAgeUseCase(mockedGameRepository);
		await usecase.execute("game1");

		// Then
		for (const p of game.players) {
			expect(p.cards.length).toBe(7);
		}
	});
});
