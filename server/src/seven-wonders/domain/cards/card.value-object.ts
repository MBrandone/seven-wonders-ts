import type { Resource } from "../resource";
import type { CardType } from "./card-type";

export class Card {
	constructor(
		public readonly name: string,
		public readonly type: CardType,
		public readonly minPlayers: number,
		public readonly age: 1 | 2 | 3,
		public readonly resourcesCost: Resource[] = [],
		public readonly coinsCost: number = 0,
	) {}

	resourcesCostMap(): Map<Resource, number> {
		return this.resourcesCost.reduce<Map<Resource, number>>((acc, resource) => {
			acc.set(resource, (acc.get(resource) ?? 0) + 1);
			return acc;
		}, new Map<Resource, number>());
	}
}
