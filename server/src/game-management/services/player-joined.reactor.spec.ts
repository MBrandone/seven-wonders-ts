import { PlayerJoinedReactor } from './player-joined.reactor';
import { GameRepository } from '../domain/game-repository.interface';
import { GameManagementGateway } from '../application/game-management.gateway';
import { Game } from '../domain/game.entity';

describe('PlayerJoinedReactor', () => {
  let reactor: PlayerJoinedReactor;
  let gameRepository: jest.Mocked<GameRepository>;
  let gameGateway: jest.Mocked<GameManagementGateway>;

  beforeEach(() => {
    gameRepository = {
      findById: jest.fn(),
    } as any;
    gameGateway = {
      emitGameFull: jest.fn(),
    } as any;
    reactor = new PlayerJoinedReactor(gameRepository, gameGateway);
  });

  it('émet un événement si la partie est pleine', async () => {
    const game = { id: 'g1', canAddPlayer: () => false } as Game;
    gameRepository.findById.mockResolvedValue(game);
    await reactor.handlePlayerJoined({ gameId: 'g1' });
    expect(gameGateway.emitGameFull).toHaveBeenCalledWith('g1');
  });

  it('ne fait rien si la partie n\'est pas pleine', async () => {
    const game = { id: 'g2', canAddPlayer: () => true } as Game;
    gameRepository.findById.mockResolvedValue(game);
    await reactor.handlePlayerJoined({ gameId: 'g2' });
    expect(gameGateway.emitGameFull).not.toHaveBeenCalled();
  });
}); 