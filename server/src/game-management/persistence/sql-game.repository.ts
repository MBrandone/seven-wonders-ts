import { Kysely } from 'kysely';
import { Database } from '../../database/database.types';
import { Game } from '../domain/game.entity';
import { Inject, Injectable } from '@nestjs/common';
import { GameStatus } from '../domain/game-status.enum';
import { GameRepository } from '../domain/game-repository.interface';

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

  async createGame(game: Game): Promise<Game> {
    await this.db.insertInto('games').values({
      id: game.id,
      created_at: game.createdAt,
      status: game.status,
      max_players: game.maxPlayers
    }).executeTakeFirst();
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

  async addPlayerToGame(gameId: string, playerId: string): Promise<{ id: string; game_id: string; player_id: string }> {
    const id = crypto.randomUUID ? crypto.randomUUID() : require('uuid').v4();
    await this.db.insertInto('game_players').values({ id, game_id: gameId, player_id: playerId }).executeTakeFirst();
    return { id, game_id: gameId, player_id: playerId };
  }

}