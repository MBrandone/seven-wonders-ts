import { GameService } from './game.service';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    createGame(maxPlayers: number): Promise<{
        id: string;
        created_at: Date;
        status: "waiting" | "in_progress" | "finished";
        max_players: number;
    } | {
        error: string;
    }>;
    addPlayerToGame(gameId: string, playerName: string): Promise<{
        id: string;
        game_id: string;
        player_id: string;
    } | {
        error: string;
    }>;
    listAvailableGames(): Promise<{
        id: string;
        created_at: Date;
        status: "waiting" | "in_progress" | "finished";
        max_players: number;
        playerCount: number;
    }[]>;
    getGame(gameId: string): Promise<{
        id: string;
        created_at: Date;
        status: "waiting" | "in_progress" | "finished";
        max_players: number;
        players: ({
            id: string;
            name: string;
        } | null)[];
    }>;
}
