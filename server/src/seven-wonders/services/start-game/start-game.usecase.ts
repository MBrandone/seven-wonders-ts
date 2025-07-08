// Use-case pour démarrer une partie de Seven Wonders

import { GameRepository } from "src/seven-wonders/domain/game-repository";
import { ALL_CARDS } from "../../domain/card.value-object";
import { Deck } from "../../domain/deck.entity";
import { ALL_WONDERS } from "../../domain/wonder.entity";

export class StartGameUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(gameId: string) {
    const game = await this.gameRepository.findById(gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    const deck = new Deck(ALL_CARDS);

    game.assignWonders(ALL_WONDERS);
    game.assignCards(deck);

    return game;
  }

} 