export interface GamePlayer {
	id: string;
	name: string;
}

export interface Game {
	id: string;
	created_at: Date;
	status: string;
	max_players: number;
	players: GamePlayer[];
}

export interface GameReadModel {
	getById(gameId: string): Promise<Game | null>;
}
