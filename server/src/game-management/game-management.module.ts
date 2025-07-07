import { Module } from '@nestjs/common';
import { GameManagementService } from './services/game-management.service';
import { GameManagementController } from './application/game-management.controller';
import { SqlGameRepository } from './persistence/sql-game.repository';
import { SqlPlayerRepository } from './persistence/sql-player.repository';
import { DatabaseModule } from '../database/database.module';
import { GameManagementGateway } from './application/game-management.gateway';
import { PlayerJoinedReactor } from './services/player-joined.reactor';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [DatabaseModule, EventEmitterModule.forRoot()],
  providers: [
    GameManagementService,
    { provide: 'GameRepository', useClass: SqlGameRepository },
    { provide: 'PlayerRepository', useClass: SqlPlayerRepository },
    GameManagementGateway,
    PlayerJoinedReactor
  ],
  controllers: [GameManagementController],
})
export class GameManagementModule {} 