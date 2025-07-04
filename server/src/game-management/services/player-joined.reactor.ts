import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { GameRepository } from '../persistence/game.repository';
import { GameManagementGateway } from '../application/game-management.gateway';

@Injectable()
export class PlayerJoinedReactor {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly gameGateway: GameManagementGateway,
  ) {}

  @OnEvent('player.joined')
  async handlePlayerJoined(payload: { gameId: string }) {
    const game = await this.gameRepository.findById(payload.gameId);
    if (game && !game.canAddPlayer()) {
      this.gameGateway.emitGameFull(game.id);
    }
  }
} 