import { Kysely } from 'kysely';
import { Database } from '../../database/database.types';
import { Player } from '../domain/player.entity';
import { Inject, Injectable } from '@nestjs/common';
import { PlayerRepository } from '../domain/player-repository.interface';

@Injectable()
export class SqlPlayerRepository implements PlayerRepository {
  constructor(@Inject('Kysely') private db: Kysely<Database>) {}

  async findByName(name: string): Promise<Player | null> {
    const row = await this.db.selectFrom('players').selectAll().where('name', '=', name).executeTakeFirst();
    if (!row) return null;
    return new Player(row.id, row.name, row.created_at);
  }

  async createPlayer(player: Player): Promise<Player> {
    await this.db.insertInto('players').values({
      id: player.id,
      name: player.name,
      created_at: player.createdAt
    }).executeTakeFirst();
    return player;
  }

  async findById(id: string): Promise<Player | null> {
    const row = await this.db.selectFrom('players').selectAll().where('id', '=', id).executeTakeFirst();
    if (!row) return null;
    return new Player(row.id, row.name, row.created_at);
  }

} 