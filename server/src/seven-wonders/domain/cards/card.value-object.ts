import type { Player } from "../player.entity";
import type { SevenWondersGame } from "../seven-wonders-game";
import { CardType } from "./card-type";

export class Card {
	constructor(
		public readonly name: string,
		public readonly type: CardType,
		public readonly minPlayers: number,
		public readonly age: 1 | 2 | 3,
		public readonly civilizationPoints?: number,
	) {}
}

export class CommercialCard extends Card {
	constructor(
		public readonly name: string,
		public readonly minPlayers: number,
		public readonly age: 1 | 2 | 3,
		public readonly civilizationPointsEarned: (player: Player) => number,
		public coinsEarned: (game: SevenWondersGame) => number,
	) {
		super(name, CardType.COMMERCIAL, minPlayers, age);
	}
}
