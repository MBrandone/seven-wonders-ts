import { ArgumentsHost, HttpStatus } from "@nestjs/common";
import { GameFullError } from "../../domain/errors/game-full.error";
import { PlayerAlreadyInGameError } from "../../domain/errors/player-already-in-game.error";
import { GameManagementDomainExceptionFilter } from "./game-management-domain-exception.filter";

describe("Quand une erreur métier game-management est levée", () => {
	let filter: GameManagementDomainExceptionFilter;
	let mockResponse: {
		status: ReturnType<typeof jest.fn>;
		json: ReturnType<typeof jest.fn>;
	};
	let mockHost: ArgumentsHost;

	beforeEach(() => {
		filter = new GameManagementDomainExceptionFilter();
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
		mockHost = {
			switchToHttp: () => ({
				getResponse: () => mockResponse,
			}),
		} as unknown as ArgumentsHost;
	});

	describe("Quand c'est une GameFullError", () => {
		it("Alors le filter renvoie 409 avec le message d'erreur", () => {
			// GIVEN
			const exception = new GameFullError();

			// WHEN
			filter.catch(exception, mockHost);

			// THEN
			expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
			expect(mockResponse.json).toHaveBeenCalledWith({
				error: "Nombre maximum de joueurs atteint pour cette partie",
			});
		});
	});

	describe("Quand c'est une PlayerAlreadyInGameError", () => {
		it("Alors le filter renvoie 409 avec le message d'erreur", () => {
			// GIVEN
			const exception = new PlayerAlreadyInGameError();

			// WHEN
			filter.catch(exception, mockHost);

			// THEN
			expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
			expect(mockResponse.json).toHaveBeenCalledWith({
				error: "Ce joueur est déjà dans la partie",
			});
		});
	});
});
