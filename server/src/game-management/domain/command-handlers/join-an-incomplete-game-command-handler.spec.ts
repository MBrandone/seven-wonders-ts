import { EventEmitter2 } from "@nestjs/event-emitter";
import { GameFullError } from "../errors/game-full.error";
import { PlayerAlreadyInGameError } from "../errors/player-already-in-game.error";
import { Game } from "../game.entity";
import { Player } from "../player.entity";
import { GameRepository } from "../repositories/game-repository";
import { PlayerRepository } from "../repositories/player-repository";
import { JoinAnIncompleteGameCommandHandler } from "./join-an-incomplete-game-command-handler";

describe("Quand on exécute JoinAnIncompleteGameCommandHandler", () => {
	let handler: JoinAnIncompleteGameCommandHandler;
	let gameRepository: GameRepository;
	let playerRepository: PlayerRepository;
	let eventEmitter: EventEmitter2;

	beforeEach(() => {
		const games: Game[] = [];
		const players: Player[] = [];
		gameRepository = {
			findById: jest.fn((id: string) =>
				Promise.resolve(games.find((g) => g.id === id) || null),
			),
			save: jest.fn().mockResolvedValue(undefined),
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
		eventEmitter = { emit: jest.fn() } as unknown as EventEmitter2;
		handler = new JoinAnIncompleteGameCommandHandler(
			gameRepository,
			playerRepository,
			eventEmitter,
		);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("Quand la partie n'existe pas", () => {
		it("Alors une erreur Partie non trouvée est levée", async () => {
			// GIVEN
			jest.mocked(gameRepository.findById).mockResolvedValue(null);

			// WHEN / THEN
			await expect(
				handler.handle({ gameId: "game-inconnu", playerName: "Alice" }),
			).rejects.toThrow("Partie non trouvée");
		});
	});

	describe("Quand la partie est pleine", () => {
		it("Alors une GameFullError est levée", async () => {
			// GIVEN
			const game = Game.create("g1", new Date(), 3, []);
			jest.mocked(gameRepository.findById).mockResolvedValue(game);
			await handler.handle({ gameId: "g1", playerName: "p1" });
			await handler.handle({ gameId: "g1", playerName: "p2" });
			await handler.handle({ gameId: "g1", playerName: "p3" });

			// WHEN / THEN
			await expect(
				handler.handle({ gameId: "g1", playerName: "Bob" }),
			).rejects.toThrow(GameFullError);
		});
	});

	describe("Quand le joueur existe déjà", () => {
		it("Alors le joueur est ajouté à la partie et l'événement player.joined est émis", async () => {
			// GIVEN
			const game = Game.create("g1", new Date(), 3, []);
			jest.mocked(gameRepository.findById).mockResolvedValue(game);
			const player = new Player("p2", "Bob", new Date());
			jest.mocked(playerRepository.findByName).mockResolvedValue(player);
			jest.mocked(playerRepository.createPlayer).mockClear();
			jest.mocked(eventEmitter.emit).mockClear();

			// WHEN
			await handler.handle({
				gameId: "g1",
				playerName: "Bob",
			});

			// THEN
			expect(gameRepository.save).toHaveBeenCalledWith(game);
			expect(game.players).toContain("p2");
			expect(eventEmitter.emit).toHaveBeenCalledWith("player.joined", {
				gameId: "g1",
			});
		});
	});

	describe("Quand le joueur n'existe pas", () => {
		it("Alors un joueur est créé, ajouté à la partie et l'événement player.joined est émis", async () => {
			// GIVEN
			const game = Game.create("g1", new Date(), 3, []);
			jest.mocked(gameRepository.findById).mockResolvedValue(game);
			jest.mocked(playerRepository.findByName).mockResolvedValue(null);
			const createdPlayer = new Player("p3", "Charlie", new Date());
			jest
				.mocked(playerRepository.createPlayer)
				.mockResolvedValue(createdPlayer);
			jest.spyOn(require("uuid"), "v4").mockReturnValue("p3");

			// WHEN
			await handler.handle({
				gameId: "g1",
				playerName: "Charlie",
			});

			// THEN
			expect(playerRepository.createPlayer).toHaveBeenCalled();
			expect(gameRepository.save).toHaveBeenCalledWith(game);
			expect(game.players).toContain("p3");
			expect(eventEmitter.emit).toHaveBeenCalledWith("player.joined", {
				gameId: "g1",
			});
		});
	});

	describe("Quand le joueur tente de rejoindre deux fois la même partie", () => {
		it("Alors une PlayerAlreadyInGameError est levée", async () => {
			// GIVEN
			const player = new Player("p2", "Bob", new Date());
			const game = Game.create("g1", new Date(), 3, []);
			jest.mocked(gameRepository.findById).mockResolvedValue(game);
			jest.mocked(playerRepository.findByName).mockResolvedValue(player);

			await handler.handle({ gameId: "g1", playerName: "Bob" });

			// WHEN / THEN
			await expect(
				handler.handle({ gameId: "g1", playerName: "Bob" }),
			).rejects.toThrow(PlayerAlreadyInGameError);
		});
	});
});
