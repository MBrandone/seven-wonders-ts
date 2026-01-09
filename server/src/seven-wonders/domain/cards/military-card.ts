import type { Resource } from "../resource";
import { Card } from "./card.value-object";
import { CardType } from "./card-type";

export class MilitaryCard extends Card {
	constructor(
		public name: string,
		public minPlayers: number,
		public age: 1 | 2 | 3,
		public readonly militaryPoints: number,
		neededResourcesToGet: Resource[] = [],
		neededCoinsToGet: number = 0,
	) {
		super(
			name,
			CardType.MILITARY,
			minPlayers,
			age,
			neededResourcesToGet,
			neededCoinsToGet,
		);
	}
}
