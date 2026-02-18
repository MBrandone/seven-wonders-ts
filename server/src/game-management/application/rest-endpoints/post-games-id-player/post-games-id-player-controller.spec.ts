import { JoinAnIncompleteGameCommandHandler } from "../../../domain/command-handlers/join-an-incomplete-game-command-handler";
import { PostGamesIdPlayerController } from "./post-games-id-player-controller";

describe("Quand on appelle le controller pour ajouter un joueur à une partie", () => {
	let controller: PostGamesIdPlayerController;
	let joinAnIncompleteGameHandler: Pick<
		JoinAnIncompleteGameCommandHandler,
		"handle"
	>;

	beforeEach(() => {
		joinAnIncompleteGameHandler = {
			handle: jest.fn(),
		};
		controller = new PostGamesIdPlayerController(
			joinAnIncompleteGameHandler as JoinAnIncompleteGameCommandHandler,
		);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("Quand on ajoute un joueur à une partie (POST /games/:gameId/players)", () => {
		it("Alors le handler est appelé avec gameId et playerName et le controller renvoie 201 avec un corps vide", async () => {
			// GIVEN
			jest.mocked(joinAnIncompleteGameHandler.handle).mockResolvedValue();

			// WHEN
			const result = await controller.addPlayerToGame("g1", "Bob");

			// THEN
			expect(joinAnIncompleteGameHandler.handle).toHaveBeenCalledWith({
				gameId: "g1",
				playerName: "Bob",
			});
			expect(result).toEqual({});
		});

		it("Alors une erreur est renvoyée si playerName est absent", async () => {
			// WHEN
			const result = await controller.addPlayerToGame("g1", "");

			// THEN
			expect(joinAnIncompleteGameHandler.handle).not.toHaveBeenCalled();
			expect(result).toEqual({ error: "playerName est requis." });
		});
	});
});
