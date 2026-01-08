import { Resource } from "../resource";
import { Card } from "./card.value-object";
import { CardType } from "./card-type";

export class CivilianCard extends Card {
	constructor(
		public name: string,
		public minPlayers: number,
		public age: 1 | 2 | 3,
		public readonly civilizationPoints: number,
		neededResourcesToGet: Resource[] = [],
		neededCoinsToGet: number = 0,
	) {
		super(name, CardType.CIVIL, minPlayers, age, neededResourcesToGet, neededCoinsToGet);
	}
}
