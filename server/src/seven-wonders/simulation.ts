import { Player } from "./domain/player.entity";
import { GameRepository } from "./domain/game-repository";
import { SevenWondersGame } from "./domain/seven-wonders-game";
import { StartGameUseCase } from "./services/start-game/start-game.usecase";
import { ChooseCardUseCase } from "./services/choose-card/choose-card.usecase";
import { NextTurnUseCase } from "./services/next-turn/next-turn.usecase";

async function main() {
    const alice = new Player('1', 'Alice', []);
    const bob = new Player('2', 'Bob', []);
    const charlie = new Player('3', 'Charlie', []);

    const gameId = 'game';
    const game = new SevenWondersGame(gameId, [alice, bob, charlie]);

    const gameRepository: GameRepository = {
        findById() {
            return Promise.resolve(game);
        }
    };

    const startGameUseCase = new StartGameUseCase(gameRepository);
    const playCardUseCase = new ChooseCardUseCase(gameRepository);
    const nextTurnUseCase = new NextTurnUseCase(gameRepository);

    await startGameUseCase.execute(gameId);

    // Age 1, draw 1
    await playCardUseCase.execute(gameId, '1', alice.cards[0].name);
    await playCardUseCase.execute(gameId, '2', bob.cards[0].name);
    await playCardUseCase.execute(gameId, '3', charlie.cards[0].name);
    await nextTurnUseCase.execute(gameId);
    
    // Age 1, draw 2
    await playCardUseCase.execute(gameId, '1', alice.cards[0].name);
    await playCardUseCase.execute(gameId, '2', bob.cards[0].name);
    await playCardUseCase.execute(gameId, '3', charlie.cards[0].name);
    await nextTurnUseCase.execute(gameId);
    
    printBoard(alice, bob, charlie);
}

main();

function printBoard(alice: Player, bob: Player, charlie: Player) {
    console.log('====================');
    alice.printBoard();
    bob.printBoard();
    charlie.printBoard();

    alice.printHand();
    bob.printHand();
    charlie.printHand();
}
