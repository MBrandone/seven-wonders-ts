import {CardType} from "./card-type";
import {ScienceSymbol} from "./science-symbol";

export class Card {
  constructor(
    public readonly name: string,
    public readonly type: CardType,
    public readonly minPlayers: number,
    public readonly age: 1 | 2 | 3,
    public readonly civilizationPoints?: number,
  ) {}
}

export class CivilianCard extends Card {
  constructor(
    public name: string,
    public minPlayers: number,
    public age: 1 | 2 | 3,
    public readonly civilizationPoints: number,
  ) {
    super(name, CardType.CIVIL, minPlayers, age);
  }
}

export class MilitaryCard extends Card {
  constructor(
      public name: string,
      public minPlayers: number,
      public age: 1 | 2 | 3,
      public readonly militaryPoints: number,
  ) {
    super(name, CardType.MILITARY, minPlayers, age);
  }
}

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