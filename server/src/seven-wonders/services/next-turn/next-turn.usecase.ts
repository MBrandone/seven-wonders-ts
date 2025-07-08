import { GameRepository } from '../../domain/game-repository';

export class NextTurnUseCase {
  constructor(private readonly gameRepository: GameRepository) {}

  async execute(gameId: string): Promise<void> {
    const game = await this.gameRepository.findById(gameId);
    if (!game) throw new Error('Partie non trouvée');

    if (game.players.some(player => !player.hasChosenCard())) {
      throw new Error('Tous les joueurs doivent avoir joué une carte');
    }

    game.players.forEach(player => player.playCard());

    const hands = game.players.map(player => player.cards);
    for (let i = 0; i < game.players.length; i++) {
      const nextIndex = (i + 1) % game.players.length;
      game.players[nextIndex].cards = hands[i];
    }
  }
} 