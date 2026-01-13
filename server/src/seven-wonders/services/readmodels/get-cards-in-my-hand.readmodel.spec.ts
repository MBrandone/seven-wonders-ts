import {
	aqueduc1,
	palace1,
	tribunal1,
} from "../../domain/cards/all-cards/civilian";
import { metierATisser1 } from "../../domain/cards/all-cards/manufactured-good";
import { caserne1, ecuries1 } from "../../domain/cards/all-cards/military";
import {
	bassinArgileux1,
	briquetterie1,
	filon1,
	scierie1,
} from "../../domain/cards/all-cards/raw-material-cards";
import type { SevenWondersGameRepository } from "../../domain/game-repository";
import { Player } from "../../domain/player.entity";
import type { SevenWondersGame } from "../../domain/seven-wonders-game";
import {
	colosseDeRhodes,
	jardinsSuspendusDeBabylone,
	mausoleeDHalicarnasse,
	pyramideDeGizeh,
	statueDeZeusAOlympie,
} from "../../domain/wonders/all-wonders";
import type { Wonder } from "../../domain/wonders/wonder.entity";
import {
	PlayableEnum,
	type PlayableWithPayment,
} from "./cards-in-my-hands-readmodel";
import { GetCardsInMyHandsReadModel } from "./get-cards-in-my-hand.readmodel";

describe("GetCardsInMyHandReadmodel", () => {
	describe("Le cas où le joueur peut jouer la carte", () => {
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
				playability: { playable: PlayableEnum.YES },
			});
		});
	});

	describe("Le cas où le joueur ne peux pas jouer la carte", () => {
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

			expect(result.cards[0].playability.playable).toBe(PlayableEnum.NO);
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

			expect(result.cards[0].playability.playable).toBe(PlayableEnum.NO);
		});
	});

	describe("Le cas où le joueur peux jouer la carte en payant", () => {
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

			expect(result.cards[0].playability.playable).toBe(
				PlayableEnum.WITH_PAYMENT,
			);
			const playability = result.cards[0].playability as PlayableWithPayment;
			expect(playability.possibleTransactionsCombinations).toEqual([
				[{ playerName: "Bob", cost: 2 }],
			]);
		});

		it("indique les deux transactions possibles quand la ressource peut être achetée au voisin de gauche ou de droite", async () => {
			const player = buildPlayer("Alice", jardinsSuspendusDeBabylone, {
				cards: [caserne1],
				coins: 5,
			});
			const leftNeighbour = buildPlayer("Bob", colosseDeRhodes, {
				board: [scierie1],
			});
			const rightNeighbour = buildPlayer("Charly", pyramideDeGizeh, {
				board: [filon1],
			});
			const game = buildGame([player, leftNeighbour, rightNeighbour]);

			const repository = {
				findById: jest.fn().mockResolvedValue(game),
			} as unknown as SevenWondersGameRepository;
			const readmodel = new GetCardsInMyHandsReadModel(repository);

			const result = await readmodel.read("game-1", "Alice");

			expect(result.cards[0].playability.playable).toBe(
				PlayableEnum.WITH_PAYMENT,
			);
			const playability = result.cards[0].playability as PlayableWithPayment;
			expect(playability.possibleTransactionsCombinations).toContainEqual([
				{ playerName: "Bob", cost: 2 },
			]);
			expect(playability.possibleTransactionsCombinations).toContainEqual([
				{ playerName: "Charly", cost: 2 },
			]);
		});

		it("indique WITH_PAYMENT et liste les transactions faites aux deux joueurs quand le joueur doit acheter des ressources chez ses deux voisins", async () => {
			const player = buildPlayer("Alice", jardinsSuspendusDeBabylone, {
				cards: [ecuries1],
				coins: 10,
			});
			const leftNeighbour = buildPlayer("Bob", statueDeZeusAOlympie, {
				board: [bassinArgileux1],
			});
			const rightNeighbour = buildPlayer("Charly", colosseDeRhodes, {
				board: [scierie1, filon1],
			});
			const game = buildGame([player, leftNeighbour, rightNeighbour]);

			const repository = {
				findById: jest.fn().mockResolvedValue(game),
			} as unknown as SevenWondersGameRepository;
			const readmodel = new GetCardsInMyHandsReadModel(repository);

			const result = await readmodel.read("game-1", "Alice");

			expect(result.cards[0].playability.playable).toBe(
				PlayableEnum.WITH_PAYMENT,
			);
			const playability = result.cards[0].playability as PlayableWithPayment;
			expect(playability.possibleTransactionsCombinations).toEqual(
				expect.arrayContaining([
					expect.arrayContaining([
						{ playerName: "Bob", cost: 2 },
						{ playerName: "Charly", cost: 2 },
					]),
				]),
			);
		});

		it("indique WITH_PAYMENT avec plusieurs combinaisons de transactions possibles quand les ressources peuvent être achetées de différentes manières", async () => {
			const player = buildPlayer("Alice", pyramideDeGizeh, {
				cards: [tribunal1],
				coins: 10,
			});
			const leftNeighbour = buildPlayer("Charly", mausoleeDHalicarnasse, {
				board: [briquetterie1],
			});
			const rightNeighbour = buildPlayer("Bob", statueDeZeusAOlympie, {
				board: [bassinArgileux1, metierATisser1],
			});
			const game = buildGame([player, leftNeighbour, rightNeighbour]);

			const repository = {
				findById: jest.fn().mockResolvedValue(game),
			} as unknown as SevenWondersGameRepository;
			const readmodel = new GetCardsInMyHandsReadModel(repository);

			const result = await readmodel.read("game-1", "Alice");

			expect(result.cards[0].playability.playable).toBe(
				PlayableEnum.WITH_PAYMENT,
			);
			const playability = result.cards[0].playability as PlayableWithPayment;
			expect(playability.possibleTransactionsCombinations).toHaveLength(4);
			expect(playability.possibleTransactionsCombinations).toContainEqual([
				{ playerName: "Charly", cost: 6 },
			]);
			expect(playability.possibleTransactionsCombinations).toContainEqual([
				{ playerName: "Bob", cost: 2 },
				{ playerName: "Charly", cost: 4 },
			]);
			expect(playability.possibleTransactionsCombinations).toContainEqual([
				{ playerName: "Bob", cost: 4 },
				{ playerName: "Charly", cost: 2 },
			]);
			expect(playability.possibleTransactionsCombinations).toContainEqual([
				{ playerName: "Bob", cost: 6 },
			]);
		});
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
