import {EndGameUsecase} from './end-game.usecase';
import {GameRepository} from '../../domain/game-repository';
import {Player} from '../../domain/player.entity';
import {ScienceSymbol} from '../../domain/cards/science-symbol';
import {CardType} from '../../domain/cards/card-type';
import {Wonder, WonderStage} from '../../domain/wonder.entity';
import {SevenWondersGame} from "../../domain/seven-wonders-game";
import {Card, CivilianCard, ScienceCard} from "../../domain/cards/card.value-object";
import {Resource} from "../../domain/resource";

describe('EndGameUsecase', () => {
  let usecase: EndGameUsecase;
  let gameRepository: jest.Mocked<GameRepository>;

  beforeEach(async () => {
    gameRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<GameRepository>;

    usecase = new EndGameUsecase(gameRepository);
  });

  it('should calculate victory points correctly for each player', async () => {
    // Given
    const player1 = Player.hydrate('id1', 'Player1', [], [
        new CivilianCard('', 1, 1, 3),
        new CivilianCard('', 1, 1, 5),
      new ScienceCard('', 1, 1, ScienceSymbol.TABLET),
      new ScienceCard('', 1, 1, ScienceSymbol.COMPASS),
      new Card('one name', CardType.COMMERCIAL, 1, 1, 2),
      new Card('one name', CardType.GUILD, 1, 1, 4),
    ], 10, []);

    const player2 = Player.hydrate('id1', 'Player2', [], [
        new CivilianCard('', 1, 1, 2),
      new ScienceCard('', 1, 1, ScienceSymbol.TABLET),
      new ScienceCard('', 1, 1, ScienceSymbol.TABLET),
      new ScienceCard('', 1, 1, ScienceSymbol.WHEEL),
      new Card('one name', CardType.GUILD, 1, 1, 3),
    ],7, []);

    player1.militaryTokens = [
      { age: 1, isDefeat: false },
      { age: 2, isDefeat: false },
      { age: 3, isDefeat: true },
    ];

    player2.militaryTokens = [
      { age: 1, isDefeat: true },
      { age: 2, isDefeat: true },
      { age: 3, isDefeat: false },
    ];

    player1.wonder = new Wonder('Wonder', Resource.ARGILE, [
      new WonderStage(true, 3),
      new WonderStage(true, 0),
      new WonderStage(true, 7),
    ]);
    player2.wonder = new Wonder('Wonder', Resource.ARGILE, [
      new WonderStage(true, 2),
      new WonderStage(true, 3),
      new WonderStage(true, 5),
    ]);

    const game = new SevenWondersGame('game1', [player1, player2]);

    gameRepository.findById.mockResolvedValue(game);

    // When
    await usecase.execute('game-123');

    // Then

    // Points de Player1:
    // - Merveille: 10 (3 + 0 + 7)
    // - Pièces: 3 (10 / 3 = 3.33 → 3)
    // - Militaire: 3 (1 + 3 - 1)
    // - Cartes bleues: 8 (3 + 5)
    // - Cartes jaunes: 2
    // - Science: 2 (1² + 1² = 2) + 0 (pas de set complet)
    // - Guildes: 4
    // Total: 32
    expect(player1.victoryPoints).toBe(32);

    // Points de Player2:
    // - Merveille: 10 (2 + 3 + 5)
    // - Pièces: 2 (7 / 3 = 2.33 → 2)
    // - Militaire: 3 (5 - 1 - 1)
    // - Cartes bleues: 2
    // - Cartes jaunes: 0
    // - Science: 5 (2² + 1² + 0² = 5) + 0 (pas de set complet)
    // - Guildes: 3
    // Total: 25
    expect(player2.victoryPoints).toBe(25);
  });
});