import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { PlayerRepository } from './player/player.repository';
import { DatabaseModule } from '../database/database.module';
import { GameGateway } from './game.gateway';

@Module({
  imports: [DatabaseModule],
  providers: [GameService, GameRepository, PlayerRepository, GameGateway],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {} 