import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { DatabaseModule } from "../database/database.module";
import { GameManagementDomainExceptionFilter } from "./application/filters/game-management-domain-exception.filter";
import { GameManagementGateway } from "./application/game-management.gateway";
import { PlayerJoinedReactor } from "./application/reactors/player-joined.reactor";
import { GetAvailableGamesController } from "./application/rest-endpoints/get-available-games/get-available-games-controller";
import { GetGamesIdController } from "./application/rest-endpoints/get-games-id/get-games-id-controller";
import { PostGamesController } from "./application/rest-endpoints/post-games/post-games-controller";
import { PostGamesIdPlayerController } from "./application/rest-endpoints/post-games-id-player/post-games-id-player-controller";
import { CreateGameCommandHandler } from "./domain/command-handlers/create-game-command-handler";
import { JoinAnIncompleteGameCommandHandler } from "./domain/command-handlers/join-an-incomplete-game-command-handler";
import { SqlAvailableGamesReadModel } from "./infrastructure/sql-available-games-read-model";
import { SqlGameReadModel } from "./infrastructure/sql-game-read-model";
import { SqlGameRepository } from "./infrastructure/sql-game-repository";
import { SqlPlayerRepository } from "./infrastructure/sql-player-repository";

@Module({
	imports: [DatabaseModule],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GameManagementDomainExceptionFilter,
		},
		CreateGameCommandHandler,
		JoinAnIncompleteGameCommandHandler,
		{ provide: "GameRepository", useClass: SqlGameRepository },
		{ provide: "PlayerRepository", useClass: SqlPlayerRepository },
		{
			provide: "AvailableGamesReadModel",
			useClass: SqlAvailableGamesReadModel,
		},
		{ provide: "GameReadModel", useClass: SqlGameReadModel },
		GameManagementGateway,
		PlayerJoinedReactor,
	],
	controllers: [
		PostGamesController,
		PostGamesIdPlayerController,
		GetGamesIdController,
		GetAvailableGamesController,
	],
})
export class GameManagementModule {}
