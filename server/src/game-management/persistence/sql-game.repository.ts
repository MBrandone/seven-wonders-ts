import { Inject, Injectable } from '@nestjs/common';
import type { Kysely } from 'kysely';
import type { Database } from '../../database/database.types';
import { Game } from '../domain/game.entity';
import type { GameRepository } from '../domain/game-repository.interface';
import type { GameStatus } from '../domain/game-status.enum';
import type { Player } from '../domain/player.entity';

@Injectable()
export class SqlGameRepository implements GameRepository {
  constructor(@Inject('Kysely') private db: Kysely<Database>) {}

  async findById(id: string): Promise<Game | null> {
    const gameRow = await this.db.selectFrom('games').selectAll().where('id', '=', id).executeTakeFirst();
    if (!gameRow) return null;
    const players = await this.db.selectFrom('game_players').select('player_id').where('game_id', '=', id).execute();
    return Game.hydrate(
      gameRow.id,
      gameRow.created_at,
      gameRow.max_players,
      players.map(p => p.player_id),
      gameRow.status as GameStatus
    );
  }

  async createGame(game: Game, playerName: Player): Promise<Game> {
    await this.db.insertInto('games').values({
      id: game.id,
      created_at: game.createdAt,
      status: game.status,
      max_players: game.maxPlayers
    }).executeTakeFirst();
    await this.addPlayerToGame(game, playerName.id);
    return game;
  }

  async findWaitingGames(): Promise<Game[]> {
    const gameRows = await this.db.selectFrom('games').selectAll().where('status', '=', 'waiting').execute();
    const games: Game[] = [];
    for (const row of gameRows) {
      const players = await this.db.selectFrom('game_players').select('player_id').where('game_id', '=', row.id).execute();
      games.push(Game.hydrate(
        row.id,
        row.created_at,
        row.max_players,
        players.map(p => p.player_id),
        row.status as GameStatus
      ));
    }
    return games;
  }

  async addPlayerToGame(game: Game, playerId: string): Promise<{ id: string; game_id: string; player_id: string }> {
    const id = crypto.randomUUID ? crypto.randomUUID() : require('uuid').v4();
    await this.db.insertInto('game_players').values({ id, game_id: game.id, player_id: playerId }).executeTakeFirst();
    await this.db.updateTable('games').set({ status: game.status }).where('id', '=', game.id).executeTakeFirst();
    return { id, game_id: game.id, player_id: playerId };
  }

}