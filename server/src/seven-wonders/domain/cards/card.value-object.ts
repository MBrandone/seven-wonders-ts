import { CardType } from "./card-type";

export class Card {
  constructor(
    public readonly name: string,
    public readonly type: CardType,
    public readonly minPlayers: number,
    public readonly age: 1 | 2 | 3,
  ) {}
}
