import { ALL_CARDS } from "../cards/all-cards/all-cards";
import { CardType } from "../cards/card-type";
import { Deck } from "./deck.entity";

describe("Deck", () => {
	let deck: Deck;

	beforeEach(() => {
		deck = new Deck(ALL_CARDS);
	});

	it("filtre les cartes par âge", () => {
		const age1 = deck.getCardsForAge(1, 3);
		expect(age1.every((card) => card.age === 1)).toBe(true);
		const age2 = deck.getCardsForAge(2, 3);
		expect(age2.every((card) => card.age === 2)).toBe(true);
		const age3 = deck.getCardsForAge(3, 3);
		expect(age3.every((card) => card.age === 3)).toBe(true);
	});

	it("filtre les cartes par nombre de joueurs", () => {
		// On prend un âge où il y a des cartes minPlayers > 3
		const age2_3j = deck.getCardsForAge(2, 3);
		expect(age2_3j.every((card) => card.minPlayers <= 3)).toBe(true);
		const age2_5j = deck.getCardsForAge(2, 5);
		expect(age2_5j.every((card) => card.minPlayers <= 5)).toBe(true);
		// Il doit y avoir plus de cartes à 5 joueurs qu'à 3 joueurs
		expect(age2_5j.length).toBeGreaterThan(age2_3j.length);
	});

	it("il y a 21 cartes pour l'âge 3 quand il y a 3 joueurs", () => {
		const age3_3j = deck.getCardsForAge(3, 3);
		expect(age3_3j.length).toBe(21);
	});

	it("répartition des types de cartes pour age 3 quand il y a 3 joueurs", () => {
		const age3_3j = deck.getCardsForAge(3, 3);
		const guilds = age3_3j.filter((card) => card.type === CardType.GUILD);
		const civils = age3_3j.filter((card) => card.type === CardType.CIVIL);
		const sciences = age3_3j.filter((card) => card.type === CardType.SCIENCE);
		const militar = age3_3j.filter((card) => card.type === CardType.MILITARY);
		const commercial = age3_3j.filter(
			(card) => card.type === CardType.COMMERCIAL,
		);

		expect(guilds.length).toStrictEqual(5);
		expect(civils.length).toStrictEqual(5);
		expect(sciences.length).toStrictEqual(5);
		expect(militar.length).toStrictEqual(3);
		expect(commercial.length).toStrictEqual(3);
	});
});
