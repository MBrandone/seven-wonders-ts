import { Deck } from "./deck.entity";
import { Player, PlayerId } from "./player.entity";
import { Wonder } from "./wonder.entity";

export class SevenWondersGame {
  wonders: Wonder[];
  cards: Deck;

  wondersByPlayers: Map<PlayerId, Wonder> = new Map();

  constructor(
    public readonly id: string,
    public readonly players: Player[],
  ) {}

  assignWonders(wonders: Wonder[]) {
    this.wonders = wonders.sort(() => Math.random() - 0.5);

    this.players.forEach((player, index) => {
      this.wondersByPlayers.set(player.id, this.wonders[index]);
    });
  }

  assignCards(deck: Deck) {
    const shuffledCardsToAssign = deck.getCardsForAge(1, this.players.length).sort(() => Math.random() - 0.5);

    this.players.forEach((player, index) => {
      const cardsToGive = shuffledCardsToAssign.slice(index * 7, (index + 1) * 7);
      player.takeCards(cardsToGive);
    });
  }
} 