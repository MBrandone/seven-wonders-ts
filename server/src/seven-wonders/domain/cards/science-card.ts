import { Card } from "./card.value-object";
import { CardType } from "./card-type";
import type { ScienceSymbol } from "./science-symbol";

export class ScienceCard extends Card {
	constructor(
		public name: string,
		public minPlayers: number,
		public age: 1 | 2 | 3,
		public readonly scienceSymbol: ScienceSymbol,
	) {
		super(name, CardType.SCIENCE, minPlayers, age);
	}
}
