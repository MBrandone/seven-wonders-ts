import { GameStatus } from "./game-status.enum";
export declare class Game {
    id: string;
    createdAt: Date;
    maxPlayers: number;
    players: string[];
    status: GameStatus;
    private constructor();
    static create(id: string, createdAt: Date, maxPlayers: number, players: string[]): Game;
    static hydrate(id: string, createdAt: Date, maxPlayers: number, players: string[], status: GameStatus): Game;
    canAddPlayer(): boolean;
}
