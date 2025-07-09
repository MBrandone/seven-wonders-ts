import { Card } from "./cards/card.value-object";

export type PlayerId = string;

export class Player {

  private chosenCardToBePlayed: Card | null = null;

  constructor(
    public readonly id: PlayerId,
    public readonly name: string,
    public cards: Card[],
    public board: Card[] = []
  ) { }

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