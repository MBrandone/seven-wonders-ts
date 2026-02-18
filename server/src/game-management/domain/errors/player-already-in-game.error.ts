import { GameManagementDomainError } from "./game-management-domain.error";

export class PlayerAlreadyInGameError extends GameManagementDomainError {
	constructor() {
		super("Ce joueur est déjà dans la partie", "PlayerAlreadyInGameError");
	}
}
