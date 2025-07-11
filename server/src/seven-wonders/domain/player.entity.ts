import type { Card } from "./cards/card.value-object";
import { CardType } from "./cards/card-type";
import type { MilitaryToken } from "./militaryToken";
import { v4 as uuidv4 } from "uuid";

import type { Wonder } from "./wonder.entity";

export type PlayerId = string;

type ConstructorParams = {
	id: PlayerId;
	name: string;
	cards: Card[];
	board: Card[];
	coins: number;
	militaryTokens: MilitaryToken[];
};

export class Player {
	private chosenCardToBePlayed: Card | null = null;
	public warVictoryTokens: number = 0;
	public warDefeatTokens: number = 0;
	wonder: Wonder;
	victoryPoints: number;

	name: string;
	public cards: Card[];
	public board: Card[];
	public coins: number;
	public militaryTokens: MilitaryToken[];
	public id: string;

	constructor(public readonly params: ConstructorParams) {
		this.id = params.id;
		this.name = params.name;
		this.cards = params.cards;
		this.board = params.board;
		this.coins = params.coins;
		this.militaryTokens = params.militaryTokens;
	}

	static create(id: PlayerId, name: string): Player {
		return new Player({
			id,
			name,
			cards: [],
			board: [],
			coins: 3,
			militaryTokens: [],
		});
	}

	static hydrate(params: ConstructorParams) {
		return new Player(params);
	}

	takeCards(cards: Card[]) {
		this.cards = cards;
	}

	playCard() {
		if (this.chosenCardToBePlayed) {
			this.cards = this.cards.filter(
				(card) => card.name !== this.chosenCardToBePlayed?.name,
			);
			this.board.push(this.chosenCardToBePlayed);
			this.chosenCardToBePlayed = null;
		}
	}

	// TODO A CARD BUT ALSO A MOVE (ON BOARD, BUILD WONDER STAGE, DISCARD)
	chooseCardToBePlayed(wantedCardName: string) {
		const card = this.cards.find(
			(ownedCard) => ownedCard.name === wantedCardName,
		);
		if (!card) {
			throw new Error("Le joueur ne possède pas cette carte dans sa main");
		}
		this.chosenCardToBePlayed = card;
	}

	hasChosenCard() {
		return this.chosenCardToBePlayed !== null;
	}

	militaryStrength(): number {
		return this.board.filter((card) => card.type === CardType.MILITARY).length;
	}

	takeWarVictoryToken() {
		this.warVictoryTokens++;
	}

	takeWarDefeatToken() {
		this.warDefeatTokens++;
	}

	printBoard() {
		console.log(`${this.name} a ${this.board.length} cartes sur son plateau :`);
		this.board.forEach((card) => {
			console.log(`- ${card.name}`);
		});
	}

	printHand() {
		console.log(`${this.name} a ${this.cards.length} cartes dans sa main :`);
		this.cards.forEach((card) => {
			console.log(`- ${card.name}`);
		});
	}
}

export const buildPlayer = (params: Partial<ConstructorParams>) => {
	return Player.hydrate({
		id: uuidv4(),
		name: "Random",
		cards: [],
		board: [],
		coins: 0,
		militaryTokens: [],
		...params,
	});
};
