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
}
