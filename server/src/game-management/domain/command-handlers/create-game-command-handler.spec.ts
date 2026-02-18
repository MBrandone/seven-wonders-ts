import { Game } from "../game.entity";
import { Player } from "../player.entity";
import { GameRepository } from "../repositories/game-repository";
import { PlayerRepository } from "../repositories/player-repository";
import { CreateGameCommandHandler } from "./create-game-command-handler";

describe("Quand on exécute CreateGameCommandHandler", () => {
	let handler: CreateGameCommandHandler;
	let gameRepository: GameRepository;
	let playerRepository: PlayerRepository;

	beforeEach(() => {
		const games: Game[] = [];
		const players: Player[] = [];
		gameRepository = {
			findById: jest.fn((id: string) =>
				Promise.resolve(games.find((g) => g.id === id) || null),
			),
			save: jest.fn((game: Game) => {
				games.push(game);
				return Promise.resolve();
			}),
		};
		playerRepository = {
			findByName: jest.fn((name: string) =>
				Promise.resolve(players.find((p) => p.name === name) || null),
			),
			createPlayer: jest.fn((player: Player) => {
				players.push(player);
				return Promise.resolve(player);
			}),
			findById: jest.fn((id: string) =>
				Promise.resolve(players.find((p) => p.id === id) || null),
			),
		};
		handler = new CreateGameCommandHandler(gameRepository, playerRepository);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("Quand le joueur existe déjà", () => {
		it("Alors une partie est créée avec ce joueur et createPlayer n'est pas appelé", async () => {
			// GIVEN
			const existingPlayer = new Player("p1", "Alice", new Date());
			await playerRepository.createPlayer(existingPlayer);
			jest.mocked(playerRepository.createPlayer).mockClear();

			// WHEN
			const result = await handler.handle({
				maxPlayers: 3,
				playerName: "Alice",
			});

			// THEN
			expect(gameRepository.save).toHaveBeenCalledTimes(1);
			expect(gameRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					maxPlayers: 3,
					players: expect.any(Array),
				}),
			);
			const savedGame = jest.mocked(gameRepository.save).mock.calls[0][0];
			expect(savedGame.players).toHaveLength(1);
			expect(result).toHaveProperty("id");
			expect(result).toHaveProperty("created_at");
			expect(result).toHaveProperty("status", "waiting");
			expect(result).toHaveProperty("max_players", 3);
			expect(playerRepository.findByName).toHaveBeenCalledWith("Alice");
			expect(playerRepository.createPlayer).not.toHaveBeenCalled();
		});
	});

	describe("Quand le nom du joueur est inconnu", () => {
		it("Alors un joueur est créé et une partie est créée avec ce joueur", async () => {
			// WHEN
			const result = await handler.handle({
				maxPlayers: 3,
				playerName: "Bob",
			});

			// THEN
			expect(playerRepository.findByName).toHaveBeenCalledWith("Bob");
			expect(playerRepository.createPlayer).toHaveBeenCalled();
			expect(gameRepository.save).toHaveBeenCalledTimes(1);
			expect(gameRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					maxPlayers: 3,
					players: expect.any(Array),
				}),
			);
			expect(result.id).toBeDefined();
			expect(result.max_players).toBe(3);
		});
	});
});
