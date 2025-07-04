import { GameRepository } from './game.repository';
import { PlayerRepository } from './player/player.repository';
import { GameGateway } from './game.gateway';
export declare class GameService {
    private readonly gameRepository;
    private readonly playerRepository;
    private readonly gameGateway;
    constructor(gameRepository: GameRepository, playerRepository: PlayerRepository, gameGateway: GameGateway);
    createGame(maxPlayers: number): Promise<{
        id: string;
        created_at: Date;
        status: "waiting" | "in_progress" | "finished";
        max_players: number;
    }>;
    addPlayerToGame(gameId: string, playerName: string): Promise<{
        id: string;
        game_id: string;
        player_id: string;
    }>;
    listAvailableGames(): Promise<{
        id: string;
        created_at: Date;
        status: "waiting" | "in_progress" | "finished";
        max_players: number;
        playerCount: number;
    }[]>;
    getGameWithPlayers(gameId: string): Promise<{
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
