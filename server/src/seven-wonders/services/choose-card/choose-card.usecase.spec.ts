import { ChooseCardUseCase } from './choose-card.usecase';
import { SevenWondersGame } from '../../domain/seven-wonders-game';
import { Player } from '../../domain/player.entity';
import { Card, CardType } from '../../domain/card.value-object';

describe('ChooseCardUseCase', () => {
    let usecase: ChooseCardUseCase;
    const mockedGameRepository = {
        findById: jest.fn((gameId: string) => gameId === 'game1' ? Promise.resolve(game) : Promise.resolve(null)),
    };

    const scriptorium_card = new Card('Scriptorium', CardType.SCIENCE, 3, 1);
    const alice = new Player('1', 'Alice', [scriptorium_card]);
    const game = new SevenWondersGame('game1', [alice]);

    usecase = new ChooseCardUseCase(mockedGameRepository);

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('lève une erreur si la partie, le joueur ou la carte est inconnue', async () => {
        // When/Then
        await expect(() => usecase.execute('unknown_game', '1', 'Scriptorium')).rejects.toThrow('Partie non trouvée');
        await expect(() => usecase.execute('game1', '2', 'Scriptorium')).rejects.toThrow('Joueur non trouvé');
        await expect(() => usecase.execute('game1', '1', 'Carte inconnue')).rejects.toThrow('Le joueur ne possède pas cette carte dans sa main');
    });

    it('lève une erreur si le joueur ne possède pas la carte dans sa main', async () => {
        // When
        await expect(() => usecase.execute('game1', '1', 'Atelier'))

            // Then
            .rejects.toThrow('Le joueur ne possède pas cette carte dans sa main');
    });

    it('déplace la carte de la main du joueur vers son plateau si tout est correct', async () => {
        // When
        await usecase.execute('game1', '1', 'Scriptorium');

        // Then
        expect(alice.hasChosenCard()).toBe(true);
    });
}); 