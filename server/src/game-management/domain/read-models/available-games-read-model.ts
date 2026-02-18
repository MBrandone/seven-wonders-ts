export interface AvailableGame {
	id: string;
	created_at: Date;
	status: string;
	max_players: number;
	playerCount: number;
}

export interface AvailableGamesReadModel {
	list(): Promise<AvailableGame[]>;
}
