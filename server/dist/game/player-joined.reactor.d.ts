import { GameRepository } from './game.repository';
import { GameGateway } from './game.gateway';
export declare class PlayerJoinedReactor {
    private readonly gameRepository;
    private readonly gameGateway;
    constructor(gameRepository: GameRepository, gameGateway: GameGateway);
    handlePlayerJoined(payload: {
        gameId: string;
    }): Promise<void>;
}
