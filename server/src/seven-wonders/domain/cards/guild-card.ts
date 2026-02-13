import { Player } from "../player.entity";
import { Resource } from "../resource";
import { SevenWondersGame } from "../seven-wonders-game";
import { Card } from "./card.value-object";
import { CardType } from "./card-type";

export class GuildCard extends Card {
	constructor(
		public name: string,
		public minPlayers: number,
		public age: 1 | 2 | 3,
		public readonly civilizationPointsEarned: (
			player: Player,
			game: SevenWondersGame,
		) => number,
		neededResourcesToGet: Resource[] = [],
		neededCoinsToGet: number = 0,
	) {
		super(
			name,
			CardType.GUILD,
			minPlayers,
			age,
			neededResourcesToGet,
			neededCoinsToGet,
		);
	}
}
