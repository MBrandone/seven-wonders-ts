import { GameManagementDomainError } from "./game-management-domain.error";

export class GameFullError extends GameManagementDomainError {
	constructor() {
		super(
			"Nombre maximum de joueurs atteint pour cette partie",
			"GameFullError",
		);
	}
}
