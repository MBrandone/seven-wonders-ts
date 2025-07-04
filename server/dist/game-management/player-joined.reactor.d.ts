import { GameRepository } from './persistence/game.repository';
import { GameManagementGateway } from './application/game-management.gateway';
export declare class PlayerJoinedReactor {
    private readonly gameRepository;
    private readonly gameGateway;
    constructor(gameRepository: GameRepository, gameGateway: GameManagementGateway);
    handlePlayerJoined(payload: {
        gameId: string;
    }): Promise<void>;
}
