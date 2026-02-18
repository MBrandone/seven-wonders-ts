export abstract class GameManagementDomainError extends Error {
	constructor(message: string, name: string) {
		super(message);
		this.name = name;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
