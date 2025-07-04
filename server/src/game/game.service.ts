import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GameRepository } from './game.repository';
import { PlayerRepository } from './player/player.repository';
import { Game } from './game.entity';
import { Player } from './player/player.entity';
import { GameGateway } from './game.gateway';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly gameGateway: GameGateway,
  ) {}

  async createGame(maxPlayers: number) {
    const id = uuidv4();
    const createdAt = new Date();
    const status: 'waiting' = 'waiting';
    const game = new Game(id, createdAt, status, maxPlayers, []);
    await this.gameRepository.createGame(game);
    return {
      id: game.id,
      created_at: game.createdAt,
      status: game.status,
      max_players: game.maxPlayers,
    };
  }

  async addPlayerToGame(gameId: string, playerName: string) {
    const game = await this.gameRepository.findById(gameId);
    if (!game) {
      throw new Error('Partie non trouvée');
    }

    if (!game.canAddPlayer()) {
      throw new Error('Nombre maximum de joueurs atteint pour cette partie');
    }

    let player = await this.playerRepository.findByName(playerName);
    if (!player) {
      player = new Player(uuidv4(), playerName, new Date());
      await this.playerRepository.createPlayer(player);
    }

    const result = await this.gameRepository.addPlayerToGame(gameId, player.id);

    const updatedGame = await this.gameRepository.findById(gameId);
    if (updatedGame && !updatedGame.canAddPlayer()) {
      this.gameGateway.emitGameFull(gameId);
    }
    
    return result;
  }

  async listAvailableGames() {
    const games = await this.gameRepository.findWaitingGames();
    return games
      .map(game => ({
        id: game.id,
        created_at: game.createdAt,
        status: game.status,
        max_players: game.maxPlayers,
        playerCount: game.players.length,
      }))
      .filter(g => g.playerCount < g.max_players);
  }

  async getGameWithPlayers(gameId: string) {
    const game = await this.gameRepository.findById(gameId);
    if (!game) {
      throw new Error('Partie non trouvée');
    }
    // Récupérer les joueurs
    const players = await Promise.all(
      game.players.map(async (playerId) => {
        const player = await this.playerRepository.findById(playerId);
        return player ? { id: player.id, name: player.name } : null;
      })
    );
    return {
      id: game.id,
      created_at: game.createdAt,
      status: game.status,
      max_players: game.maxPlayers,
      players: players.filter(Boolean),
    };
  }
} 