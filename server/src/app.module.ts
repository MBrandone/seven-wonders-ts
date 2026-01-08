import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { GameManagementModule } from "./game-management/game-management.module";
import { HealthCheckModule } from "./health-check/health-check.module";
import { SevenWondersModule } from "./seven-wonders/seven-wonders.module";

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		GameManagementModule,
		HealthCheckModule,
		SevenWondersModule,
		ConfigModule.forRoot(),
	],
})
export class AppModule {}
