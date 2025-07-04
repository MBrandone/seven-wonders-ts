export interface Player {
    id: string;
    name: string;
    created_at: Date;
}
export interface Game {
    id: string;
    created_at: Date;
    status: 'waiting' | 'in_progress' | 'finished';
    max_players: number;
}
export interface Wonder {
    id: string;
    name: string;
}
export interface GamePlayer {
    id: string;
    game_id: string;
    player_id: string;
}
export interface Database {
    players: Player;
    games: Game;
    wonders: Wonder;
    game_players: GamePlayer;
}
