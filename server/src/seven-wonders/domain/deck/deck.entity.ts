import { ALL_CARDS } from "../cards/all-cards";
import type { Card } from "../cards/card.value-object";
import { CardType } from "../cards/card-type";

export class Deck {
	private allCards: Card[];

	constructor(cards: Card[] = ALL_CARDS) {
		this.allCards = cards;
	}

	getCardsForAge(age: 1 | 2 | 3, playerCount: number): Card[] {
		const cards = this.allCards
			.filter((card) => card.age === age)
			.filter((card) => card.minPlayers <= playerCount)
			.filter((card) => card.type !== CardType.GUILD);

		const guildsCards = this.allCards.filter(
			(card) => card.type === CardType.GUILD,
		);
		const randomGuildCardsToAdd = this.getRandomGuildCards(
			guildsCards,
			playerCount,
		);

		if (age !== 3) {
			return cards;
		}

		return [...cards, ...randomGuildCardsToAdd];
	}

	getRandomGuildCards(guildsCards: Card[], playerCount: number) {
		return guildsCards
			.sort(() => Math.random() - 0.5)
			.slice(0, playerCount + 2);
	}
}
