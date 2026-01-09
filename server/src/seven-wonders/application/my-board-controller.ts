import { Controller, Get, Param } from "@nestjs/common";
import type { GetCardsInMyHandsReadModel } from "../services/readmodels/cards-in-my-hand.readmodel";

@Controller("games")
export class MyBoardController {
	constructor(
		private readonly getCardsInMyHandReadModel: GetCardsInMyHandsReadModel,
	) {}

	@Get(":gameId/:playerName")
	async getCardsInMyHand(
		@Param("gameId") gameId: string,
		@Param("playerName") playerName: string,
	) {
		return this.getCardsInMyHandReadModel.read(gameId, playerName);
	}
}
