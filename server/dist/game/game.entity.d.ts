export declare class Game {
    id: string;
    createdAt: Date;
    status: 'waiting' | 'in_progress' | 'finished';
    maxPlayers: number;
    players: string[];
    constructor(id: string, createdAt: Date, status: 'waiting' | 'in_progress' | 'finished', maxPlayers: number, players: string[]);
    canAddPlayer(): boolean;
}
