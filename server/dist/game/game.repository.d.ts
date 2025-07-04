import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { Game } from './game.entity';
export declare class GameRepository {
    private db;
    constructor(db: Kysely<Database>);
    findById(id: string): Promise<Game | null>;
    createGame(game: Game): Promise<Game>;
    findWaitingGames(): Promise<Game[]>;
    addPlayerToGame(gameId: string, playerId: string): Promise<{
        id: string;
        game_id: string;
        player_id: string;
    }>;
}
