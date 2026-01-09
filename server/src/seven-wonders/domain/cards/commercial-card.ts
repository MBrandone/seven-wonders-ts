import type { Player } from "../player.entity";
import type { Resource } from "../resource";
import type { SevenWondersGame } from "../seven-wonders-game";
import { Card } from "./card.value-object";
import { CardType } from "./card-type";

export class CommercialCard extends Card {
	constructor(
		public readonly name: string,
		public readonly minPlayers: number,
		public readonly age: 1 | 2 | 3,
		public readonly civilizationPointsEarned: (player: Player) => number,
		public coinsEarned: (game: SevenWondersGame) => number,
		neededResourcesToGet: Resource[] = [],
		neededCoinsToGet: number = 0,
	) {
		super(
			name,
			CardType.COMMERCIAL,
			minPlayers,
			age,
			neededResourcesToGet,
			neededCoinsToGet,
		);
	}
}
