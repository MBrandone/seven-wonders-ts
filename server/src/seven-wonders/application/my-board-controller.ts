import { Controller, Get, Param } from "@nestjs/common";
import { GetCardsInMyHandsReadModel } from "../readmodels/cards-in-my-hand.readmodel";

@Controller("games")
export class MyBoardController {
	constructor(private readonly getCardsInMyHandReadModel: GetCardsInMyHandsReadModel) {}

    @Get("board/:gameId/:playerName")
	async getCardsInMyHand(@Param("gameId") gameId: string, @Param("playerName") playerName: string) {
		return this.getCardsInMyHandReadModel.read(gameId, playerName)
	}
	
}