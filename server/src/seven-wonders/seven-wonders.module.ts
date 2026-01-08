import { Module } from "@nestjs/common";
import { MyBoardController } from "./application/my-board-controller";
import { GetCardsInMyHandsReadModel } from "./readmodels/cards-in-my-hand.readmodel";
import { InMemoryGameRepository } from "./infrastructure/in-memory-game-repository";
import type { SevenWondersGameRepository } from "./domain/game-repository";

@Module({
	providers: [
		GetCardsInMyHandsReadModel,
		{ provide: "SevenWondersGameRepository", useClass: InMemoryGameRepository },
	],
	exports: [],
	controllers: [MyBoardController],
})
export class SevenWondersModule {}
