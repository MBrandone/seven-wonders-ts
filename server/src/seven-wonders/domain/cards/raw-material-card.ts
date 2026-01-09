import type { Resource } from "../resource";
import { Card } from "./card.value-object";
import { CardType } from "./card-type";

export class RawMaterialCard extends Card {
	constructor(
		public readonly name: string,
		public readonly minPlayers: number,
		public readonly age: 1 | 2 | 3,
		public readonly resourcesProduced: Resource[],
		public readonly numberOfResources: 1 | 2,
		neededResourcesToGet: Resource[] = [],
		neededCoinsToGet: number = 0,
	) {
		super(
			name,
			CardType.RAW_MATERIAL,
			minPlayers,
			age,
			neededResourcesToGet,
			neededCoinsToGet,
		);
	}
}
