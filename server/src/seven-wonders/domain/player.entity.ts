import { Card } from "./cards/card.value-object";
import { CardType } from "./cards/card-type";

export type PlayerId = string;

export class Player {
  private chosenCardToBePlayed: Card | null = null;
  public warVictoryTokens: number = 0;
  public warDefeatTokens: number = 0;

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

  // Calcule la force militaire du joueur
  militaryStrength(): number {
    // On suppose que chaque carte militaire vaut 1 bouclier (à adapter si besoin)
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