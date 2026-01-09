import { aqueduc1, palace1 } from "../../domain/cards/all-cards/civilian";
import { caserne1 } from "../../domain/cards/all-cards/military";
import { scierie1 } from "../../domain/cards/all-cards/raw-material-cards";
import type { SevenWondersGameRepository } from "../../domain/game-repository";
import { Player } from "../../domain/player.entity";
import type { SevenWondersGame } from "../../domain/seven-wonders-game";
import {
	colosseDeRhodes,
	jardinsSuspendusDeBabylone,
	pyramideDeGizeh,
	statueDeZeusAOlympie,
} from "../../domain/wonders/all-wonders";
import type { Wonder } from "../../domain/wonders/wonder.entity";
import { GetCardsInMyHandsReadModel } from "./cards-in-my-hand.readmodel";

describe("CardsInMyHandReadmodel", () => {
	it("transmet le nom et le type et indique YES quand le joueur possède les ressources", async () => {
		const player = buildPlayer("Alice", jardinsSuspendusDeBabylone, {
			cards: [scierie1],
			coins: 3,
		});
		const neighbours = [
			buildPlayer("Bob", colosseDeRhodes),
			buildPlayer("Charly", pyramideDeGizeh),
		];
		const game = buildGame([player, ...neighbours]);

		const repository = {
			findById: jest.fn().mockResolvedValue(game),
		} as unknown as SevenWondersGameRepository;
		const readmodel = new GetCardsInMyHandsReadModel(repository);

		const result = await readmodel.read("game-1", "Alice");

		expect(result.cards).toHaveLength(1);
		expect(result.cards[0]).toEqual({
			name: "Scierie",
			type: "RAW_MATERIAL",
			playable: "YES",
			costToPlay: [],
		});
	});

	it("indique WITH_PAYMENT quand la ressource manque et est achetée à un voisin", async () => {
		const player = buildPlayer("Alice", jardinsSuspendusDeBabylone, {
			cards: [caserne1],
			coins: 5,
		});
		const leftNeighbour = buildPlayer("Bob", colosseDeRhodes);
		const rightNeighbour = buildPlayer("Charly", pyramideDeGizeh);
		const game = buildGame([player, leftNeighbour, rightNeighbour]);

		const repository = {
			findById: jest.fn().mockResolvedValue(game),
		} as unknown as SevenWondersGameRepository;
		const readmodel = new GetCardsInMyHandsReadModel(repository);

		const result = await readmodel.read("game-1", "Alice");

		expect(result.cards[0].playable).toBe("WITH_PAYMENT");
		expect(result.cards[0].costToPlay).toEqual([
			{ playerName: "Bob", cost: 2 },
		]);
	});

	it("indique NO quand la ressource manque chez tout le monde", async () => {
		const player = buildPlayer("Alice", jardinsSuspendusDeBabylone, {
			cards: [aqueduc1],
		});
		const leftNeighbour = buildPlayer("Bob", colosseDeRhodes);
		const rightNeighbour = buildPlayer("Charly", pyramideDeGizeh);
		const game = buildGame([player, leftNeighbour, rightNeighbour]);

		const repository = {
			findById: jest.fn().mockResolvedValue(game),
		} as unknown as SevenWondersGameRepository;
		const readmodel = new GetCardsInMyHandsReadModel(repository);

		const result = await readmodel.read("game-1", "Alice");

		expect(result.cards[0].playable).toBe("NO");
		expect(result.cards[0].costToPlay).toEqual([]);
	});

	it("indique NO quand les voisins ont les ressources mais que le joueur ne peut pas payer", async () => {
		const player = buildPlayer("Alice", statueDeZeusAOlympie, {
			cards: [palace1],
			coins: 1,
		});
		const leftNeighbour = buildPlayer("Bob", jardinsSuspendusDeBabylone);
		const rightNeighbour = buildPlayer("Charly", pyramideDeGizeh);
		const game = buildGame([player, leftNeighbour, rightNeighbour]);

		const repository = {
			findById: jest.fn().mockResolvedValue(game),
		} as unknown as SevenWondersGameRepository;
		const readmodel = new GetCardsInMyHandsReadModel(repository);

		const result = await readmodel.read("game-1", "Alice");

		expect(result.cards[0].playable).toBe("NO");
		expect(result.cards[0].costToPlay).toEqual([]);
	});
});

const buildPlayer = (
	name: string,
	wonder: Wonder,
	overrides: Partial<Player> = {},
): Player => {
	const player = {
		id: `${name}-id`,
		name,
		cards: [],
		board: [],
		coins: 3,
		militaryTokens: [],
		...overrides,
	};

	const newPlayer = new Player(player);
	newPlayer.wonder = wonder;

	return newPlayer;
};

const buildGame = (players: Player[]): SevenWondersGame =>
	({
		id: "game-1",
		players,
		getNeighbours: (player: Player) => {
			const idx = players.findIndex((p) => p.name === player.name);
			const left = players[(idx - 1 + players.length) % players.length];
			const right = players[(idx + 1) % players.length];
			return [left, right];
		},
	}) as unknown as SevenWondersGame;
