import { Resource } from "../domain/resource";
import type { SevenWondersGame } from "../domain/seven-wonders-game";
import type { Card } from "../domain/cards/card.value-object";
import type { Player } from "../domain/player.entity";
import { GetCardsInMyHandsReadModel } from "./cards-in-my-hand.readmodel";

describe("CardsInMyHandReadmodel", () => {
	it("transmet le nom et le type et indique YES quand le joueur possède les ressources", async () => {
		const card = buildCard("Scierie", "RAW_MATERIAL", [Resource.BOIS], 0);
		const player = buildPlayer("Alice", {
			cards: [card],
			resources: [Resource.BOIS],
			coins: 3,
		});
		const neighbours = [buildPlayer("Bob"), buildPlayer("Charly")];
		const game = buildGame([player, ...neighbours]);

		const repository = {
			findById: jest.fn().mockResolvedValue(game),
		} as any;
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
		const card = buildCard("Caserne", "MILITARY", [Resource.MINERAI], 0);
		const player = buildPlayer("Alice", {
			cards: [card],
			resources: [],
			coins: 5,
		});
		const leftNeighbour = buildPlayer("Bob", { resources: [Resource.MINERAI] });
		const rightNeighbour = buildPlayer("Charly", { resources: [] });
		const game = buildGame([player, leftNeighbour, rightNeighbour]);

		const repository = {
			findById: jest.fn().mockResolvedValue(game),
		} as any;
		const readmodel = new GetCardsInMyHandsReadModel(repository);

		const result = await readmodel.read("game-1", "Alice");

		expect(result.cards[0].playable).toBe("WITH_PAYMENT");
		expect(result.cards[0].costToPlay).toEqual([
			{ playerName: "Bob", cost: 2 },
		]);
	});

	it("indique NO quand la ressource manque chez tout le monde", async () => {
		const card = buildCard("Aqueduc", "CIVIL", [Resource.PIERRE, Resource.PIERRE], 0);
		const player = buildPlayer("Alice", { cards: [card], resources: [] });
		const leftNeighbour = buildPlayer("Bob", { resources: [] });
		const rightNeighbour = buildPlayer("Charly", { resources: [] });
		const game = buildGame([player, leftNeighbour, rightNeighbour]);

		const repository = {
			findById: jest.fn().mockResolvedValue(game),
		} as any;
		const readmodel = new GetCardsInMyHandsReadModel(repository);

		const result = await readmodel.read("game-1", "Alice");

		expect(result.cards[0].playable).toBe("NO");
		expect(result.cards[0].costToPlay).toEqual([]);
	});

	it("indique NO quand les voisins ont les ressources mais que le joueur ne peut pas payer", async () => {
		const card = buildCard("Palace", "CIVIL", [Resource.BOIS, Resource.PIERRE], 0);
		const player = buildPlayer("Alice", {
			cards: [card],
			resources: [],
			coins: 1,
		});
		const leftNeighbour = buildPlayer("Bob", {
			resources: [Resource.BOIS],
		});
		const rightNeighbour = buildPlayer("Charly", {
			resources: [Resource.PIERRE],
		});
		const game = buildGame([player, leftNeighbour, rightNeighbour]);

		const repository = {
			findById: jest.fn().mockResolvedValue(game),
		} as any;
		const readmodel = new GetCardsInMyHandsReadModel(repository);

		const result = await readmodel.read("game-1", "Alice");

		expect(result.cards[0].playable).toBe("NO");
		expect(result.cards[0].costToPlay).toEqual([]);
	});
});

const buildCard = (
	name: string,
	type: string,
    resourcesCost: Resource[] = [],
    coinsCost: number,
	overrides: Partial<Card> = {},
): Card =>
	({
		name,
		type,
		age: 1,
		minPlayers: 3,
        resourcesCost: resourcesCost,
        coinsCost: coinsCost,
		...overrides,
	}) as Card;

const buildPlayer = (
	name: string,
	overrides: Partial<Player> & {
		resources?: Resource[];
	} = {},
): Player =>
	({
		id: `${name}-id`,
		name,
		cards: [],
		board: [],
		coins: 3,
		militaryTokens: [],
		...overrides,
	}) as Player;

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
