import { Game } from "../../domain/game.entity";
import { GameStatus } from "../../domain/game-status.enum";
import { GameRepository } from "../../domain/repositories/game-repository";
import { GameManagementGateway } from "../game-management.gateway";
import { PlayerJoinedReactor } from "./player-joined.reactor";

describe("PlayerJoinedReactor", () => {
	let reactor: PlayerJoinedReactor;
	let gameRepository: jest.Mocked<GameRepository>;
	let gameGateway: jest.Mocked<GameManagementGateway>;

	const fullGame = Game.hydrate(
		"g1",
		new Date(),
		3,
		["p1", "p2", "p3"],
		GameStatus.IN_PROGRESS,
	);
	const waitingGame = Game.hydrate(
		"g2",
		new Date(),
		3,
		["p1", "p2"],
		GameStatus.WAITING,
	);

	beforeEach(() => {
		gameRepository = {
			findById: jest.fn((id: string) => {
				if (id === "g1") return Promise.resolve(fullGame);
				if (id === "g2") return Promise.resolve(waitingGame);
				return Promise.resolve(null);
			}),
			save: jest.fn(),
		} as unknown as jest.Mocked<GameRepository>;
		gameGateway = {
			emitGameFull: jest.fn(),
		} as unknown as jest.Mocked<GameManagementGateway>;
		reactor = new PlayerJoinedReactor(gameRepository, gameGateway);
	});

	it("émet un événement si la partie est pleine", async () => {
		// Given
		gameRepository.findById.mockResolvedValue(fullGame);

		// When
		await reactor.handlePlayerJoined({ gameId: "g1" });

		// Then
		expect(gameGateway.emitGameFull).toHaveBeenCalledWith("g1");
	});

	it("ne fait rien si la partie n'est pas pleine", async () => {
		// Given
		gameRepository.findById.mockResolvedValue(waitingGame);

		// When
		await reactor.handlePlayerJoined({ gameId: "g2" });

		// Then
		expect(gameGateway.emitGameFull).not.toHaveBeenCalled();
	});
});
