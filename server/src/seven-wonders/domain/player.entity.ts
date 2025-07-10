import {Card} from "./cards/card.value-object";
import {CardType} from "./cards/card-type";
import {Wonder} from "./wonder.entity";
import {MilitaryToken} from "./militaryToken";

export type PlayerId = string;

export class Player {
    private chosenCardToBePlayed: Card | null = null;
    public warVictoryTokens: number = 0;
    public warDefeatTokens: number = 0;
    wonder: Wonder;
    victoryPoints: number;

    private constructor(
        public readonly id: PlayerId,
        public readonly name: string,
        public cards: Card[],
        public board: Card[] = [],
        public coins: number = 0,
        public militaryTokens: MilitaryToken[] = [],
    ) {
    }

    static create(id: PlayerId, name: string): Player {
        return new Player(id, name, [], [], 3, []);
    }

    static hydrate(id: PlayerId, name: string, cards: Card[], board: Card[], coins: number, militaryTokens: MilitaryToken[]) {
        return new Player(id, name, cards, board, coins, militaryTokens);
    }

    takeCards(cards: Card[]) {
        this.cards = cards;
    }

    playCard() {
        if (this.chosenCardToBePlayed) {
            this.cards = this.cards.filter(c => c.name !== this.chosenCardToBePlayed!.name);
            this.board.push(this.chosenCardToBePlayed);
            this.chosenCardToBePlayed = null;
        }
    }

    chooseCardToBePlayed(wantedCardName: string) {
        const card = this.cards.find(ownedCard => ownedCard.name === wantedCardName);
        if (!card) {
            throw new Error('Le joueur ne possède pas cette carte dans sa main');
        }
        this.chosenCardToBePlayed = card;
    }

    hasChosenCard() {
        return this.chosenCardToBePlayed !== null;
    }

    militaryStrength(): number {
        return this.board.filter(card => card.type === CardType.MILITARY).length;
    }

    takeWarVictoryToken() {
        this.warVictoryTokens++;
    }

    takeWarDefeatToken() {
        this.warDefeatTokens++;
    }

    printBoard() {
        console.log(`${this.name} a ${this.board.length} cartes sur son plateau :`);
        this.board.forEach(card => {
            console.log(`- ${card.name}`);
        });
    }

    printHand() {
        console.log(`${this.name} a ${this.cards.length} cartes dans sa main :`);
        this.cards.forEach(card => {
            console.log(`- ${card.name}`);
        });
    }
}
