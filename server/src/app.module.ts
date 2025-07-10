import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GameManagementModule } from "./game-management/game-management.module";
import { HealthCheckModule } from "./health-check/health-check.module";

@Module({
	imports: [GameManagementModule, HealthCheckModule, ConfigModule.forRoot()],
})
export class AppModule {}
