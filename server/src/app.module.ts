import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [GameModule, HealthCheckModule, ConfigModule.forRoot()],
})
export class AppModule {}
