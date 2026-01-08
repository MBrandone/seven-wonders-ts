import { Module } from "@nestjs/common";
import { MyBoardController } from "./application/my-board-controller";
import { GetCardsInMyHandsReadModel } from "./services/readmodels/cards-in-my-hand.readmodel";
import { DummyGameRepository } from "./infrastructure/dummy-game-repository";

@Module({
	providers: [
		GetCardsInMyHandsReadModel,
		{ provide: "SevenWondersGameRepository", useClass: DummyGameRepository },
	],
	controllers: [MyBoardController],
})
export class SevenWondersModule {}
