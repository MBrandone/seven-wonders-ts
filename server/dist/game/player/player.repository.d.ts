import { Kysely } from 'kysely';
import { Database } from '../../database/database.types';
import { Player } from './player.entity';
export declare class PlayerRepository {
    private db;
    constructor(db: Kysely<Database>);
    findByName(name: string): Promise<Player | null>;
    createPlayer(player: Player): Promise<Player>;
    findById(id: string): Promise<Player | null>;
}
