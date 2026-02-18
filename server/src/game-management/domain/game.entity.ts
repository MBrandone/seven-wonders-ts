import { GameFullError } from "./errors/game-full.error";
import { PlayerAlreadyInGameError } from "./errors/player-already-in-game.error";
import { GameStatus } from "./game-status.enum";

export class Game {
	private constructor(
		public id: string,
		public createdAt: Date,
		public maxPlayers: number,
		public players: string[],
		public status: GameStatus,
	) {
		if (maxPlayers < 3 || maxPlayers > 7) {
			throw new Error("Un jeu doit avoir entre 3 et 7 joueurs maximum.");
		}
	}

	static create(
		id: string,
		createdAt: Date,
		maxPlayers: number,
		players: string[],
	): Game {
		return new Game(id, createdAt, maxPlayers, players, GameStatus.WAITING);
	}

	static hydrate(
		id: string,
		createdAt: Date,
		maxPlayers: number,
		players: string[],
		status: GameStatus,
	): Game {
		return new Game(id, createdAt, maxPlayers, players, status);
	}

	canAddPlayer(): boolean {
		return this.players.length < this.maxPlayers;
	}

	addPlayer(playerId: string): void {
		if (!this.canAddPlayer()) {
			throw new GameFullError();
		}
		if (this.players.includes(playerId)) {
			throw new PlayerAlreadyInGameError();
		}
		this.players.push(playerId);
		if (this.players.length === this.maxPlayers) {
			this.status = GameStatus.IN_PROGRESS;
		}
	}
}
