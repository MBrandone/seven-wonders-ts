import { Module } from '@nestjs/common';
import { GameManagementService } from './services/game-management.service';
import { GameManagementController } from './application/game-management.controller';
import { GameRepository } from './persistence/game.repository';
import { PlayerRepository } from './player/player.repository';
import { DatabaseModule } from '../database/database.module';
import { GameManagementGateway } from './application/game-management.gateway';
import { PlayerJoinedReactor } from './services/player-joined.reactor';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [DatabaseModule, EventEmitterModule.forRoot()],
  providers: [GameManagementService, GameRepository, PlayerRepository, GameManagementGateway, PlayerJoinedReactor],
  controllers: [GameManagementController],
  exports: [GameManagementService],
})
export class GameManagementModule {} 