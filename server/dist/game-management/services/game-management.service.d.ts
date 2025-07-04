import { GameRepository } from '../persistence/game.repository';
import { PlayerRepository } from '../player/player.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class GameManagementService {
    private readonly gameRepository;
    private readonly playerRepository;
    private readonly eventEmitter;
    constructor(gameRepository: GameRepository, playerRepository: PlayerRepository, eventEmitter: EventEmitter2);
    createGame(maxPlayers: number): Promise<{
        id: string;
        created_at: Date;
        status: import("../domain/game-status.enum").GameStatus;
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
        status: import("../domain/game-status.enum").GameStatus;
        max_players: number;
        playerCount: number;
    }[]>;
    getGameWithPlayers(gameId: string): Promise<{
        id: string;
        created_at: Date;
        status: import("../domain/game-status.enum").GameStatus;
        max_players: number;
        players: ({
            id: string;
            name: string;
        } | null)[];
    }>;
}
