import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { GameManagementController } from "./application/game-management.controller";
import { GameManagementGateway } from "./application/game-management.gateway";
import { SqlGameRepository } from "./persistence/sql-game.repository";
import { SqlPlayerRepository } from "./persistence/sql-player.repository";
import { GameManagementService } from "./services/game-management.service";
import { PlayerJoinedReactor } from "./services/player-joined.reactor";

@Module({
	imports: [DatabaseModule],
	providers: [
		GameManagementService,
		{ provide: "GameRepository", useClass: SqlGameRepository },
		{ provide: "PlayerRepository", useClass: SqlPlayerRepository },
		GameManagementGateway,
		PlayerJoinedReactor,
	],
	controllers: [GameManagementController],
})
export class GameManagementModule {}
