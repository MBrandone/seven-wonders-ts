import type { Player } from "../player.entity";
import type { SevenWondersGame } from "../seven-wonders-game";
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
	) {
		super(name, CardType.GUILD, minPlayers, age);
	}
}
