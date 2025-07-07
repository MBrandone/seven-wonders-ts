import { GameManagementService } from './game-management.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Game } from '../domain/game.entity';
import { Player } from '../domain/player.entity';
import { GameRepository } from '../domain/game-repository.interface';
import { PlayerRepository } from '../domain/player-repository.interface';

describe('GameManagementService', () => {
    let service: GameManagementService;
    let gameRepository: GameRepository;
    let playerRepository: PlayerRepository;
    let eventEmitter: EventEmitter2;

    beforeEach(() => {
        const games: Game[] = [];
        const players: Player[] = [];
        gameRepository = {
            createGame: jest.fn((game: Game) => { games.push(game); return Promise.resolve(game); }),
            findById: jest.fn((id: string) => Promise.resolve(games.find(g => g.id === id) || null)),
            addPlayerToGame: jest.fn((game: Game, playerId: string) => { if (!game.players.includes(playerId)) game.players.push(playerId); return Promise.resolve({ id: 'gp1', game_id: game.id, player_id: playerId }); }),
            findWaitingGames: jest.fn(() => Promise.resolve(games)),
        };
        playerRepository = {
            findByName: jest.fn((name: string) => Promise.resolve(players.find(p => p.name === name) || null)),
            createPlayer: jest.fn((player: Player) => { players.push(player); return Promise.resolve(player); }),
            findById: jest.fn((id: string) => Promise.resolve(players.find(p => p.id === id) || null)),
        };
        eventEmitter = { emit: jest.fn() } as unknown as EventEmitter2;
        service = new GameManagementService(gameRepository, playerRepository, eventEmitter);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('createGame', () => {
        it('crée une partie avec un joueur déjà existant', async () => {
            // Given 
            const existingPlayer = new Player('p1', 'Alice', new Date());
            playerRepository.createPlayer(existingPlayer);

            // When
            const result = await service.createGame(3, 'Alice');

            // Then
            expect(gameRepository.createGame).toHaveBeenCalled();
            expect(result).toHaveProperty('id');
            expect(playerRepository.findByName).toHaveBeenCalledWith('Alice');
            expect(playerRepository.createPlayer).toHaveBeenCalledTimes(1); // appelé dans beforeEach
        });

        it('crée une partie et un joueur si le nom est inconnu', async () => {
            // When
            const result = await service.createGame(3, 'Bob');

            // Then
            expect(playerRepository.findByName).toHaveBeenCalledWith('Bob');
            expect(playerRepository.createPlayer).toHaveBeenCalled();
            expect(gameRepository.createGame).toHaveBeenCalled();
        });
    });


    describe('addPlayerToGame', () => {
        it('renvoie une erreur si le game est non existant', async () => {
            // Given
            gameRepository.findById = jest.fn(() => Promise.resolve(null));

            // When
            await expect(service.addPlayerToGame('game-inconnu', 'Alice'))
                // Then
                .rejects.toThrow('Partie non trouvée');
        });

        it('renvoie une erreur si le game est plein', async () => {
            // Given
            const game = Game.create('g1', new Date(), 3, []);
            gameRepository.findById = jest.fn(() => Promise.resolve(game));
            await service.addPlayerToGame('g1', 'p1');
            await service.addPlayerToGame('g1', 'p2');
            await service.addPlayerToGame('g1', 'p3');

            // When
            await expect(service.addPlayerToGame('g1', 'Bob'))
                // Then
                .rejects.toThrow('Nombre maximum de joueurs atteint pour cette partie');
        });

        it('ajoute un joueur existant au game et l’enregistre', async () => {
            // Given
            const game = Game.create('g1', new Date(), 3, []);
            gameRepository.findById = jest.fn(() => Promise.resolve(game));
            const player = new Player('p2', 'Bob', new Date());
            playerRepository.findByName = jest.fn(() => Promise.resolve(player));
            playerRepository.createPlayer = jest.fn();
            gameRepository.addPlayerToGame = jest.fn(() => Promise.resolve({ id: 'gp1', game_id: 'g1', player_id: 'p2' }));
            eventEmitter.emit = jest.fn();

            // When
            const result = await service.addPlayerToGame('g1', 'Bob');

            // Then
            expect(gameRepository.addPlayerToGame).toHaveBeenCalledWith(game, 'p2');
            expect(result).toEqual({ id: 'gp1', game_id: 'g1', player_id: 'p2' });
            expect(eventEmitter.emit).toHaveBeenCalledWith('player.joined', { gameId: 'g1' });
        });

        it('crée un joueur inconnu, l’ajoute au game et enregistre', async () => {
            // Given
            const game = Game.create('g1', new Date(), 3, []);
            gameRepository.findById = jest.fn(() => Promise.resolve(game));
            playerRepository.findByName = jest.fn(() => Promise.resolve(null));
            const createdPlayer = new Player('p3', 'Charlie', new Date());
            playerRepository.createPlayer = jest.fn(() => Promise.resolve(createdPlayer));
            playerRepository.findById = jest.fn(() => Promise.resolve(createdPlayer));
            gameRepository.addPlayerToGame = jest.fn(() => Promise.resolve({ id: 'gp2', game_id: 'g1', player_id: 'p3' }));
            eventEmitter.emit = jest.fn();
            // mock uuidv4 pour avoir un id stable
            jest.spyOn(require('uuid'), 'v4').mockReturnValue('p3');

            // When
            const result = await service.addPlayerToGame('g1', 'Charlie');

            // Then
            expect(playerRepository.createPlayer).toHaveBeenCalled();
            expect(gameRepository.addPlayerToGame).toHaveBeenCalledWith(game, 'p3');
            expect(result).toEqual({ id: 'gp2', game_id: 'g1', player_id: 'p3' });
            expect(eventEmitter.emit).toHaveBeenCalledWith('player.joined', { gameId: 'g1' });
        });
    });
}); 