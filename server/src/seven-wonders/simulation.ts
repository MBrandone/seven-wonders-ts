import type { SevenWondersGameRepository } from "./domain/game-repository";
import { Player } from "./domain/player.entity";
import { SevenWondersGame } from "./domain/seven-wonders-game";
import { ChooseCardUseCase } from "./services/choose-card/choose-card.usecase";
import { EndGameUsecase } from "./services/end-game/end-game.usecase";
import { NextAgeUseCase } from "./services/next-age/next-age.usecase";
import { NextTurnUseCase } from "./services/next-turn/next-turn.usecase";
import { PointCalculatorService } from "./services/point-calculator/point-calculator.service";
import { StartGameUseCase } from "./services/start-game/start-game.usecase";

async function main() {
	const alice = Player.create("1", "Alice");
	const bob = Player.create("2", "Bob");
	const charlie = Player.create("3", "Charlie");

	const gameId = "game";
	const game = new SevenWondersGame(gameId, [alice, bob, charlie]);

	const gameRepository: SevenWondersGameRepository = {
		findById() {
			return Promise.resolve(game);
		},
		addGame: () => Promise.resolve()
	};

	const startGameUseCase = new StartGameUseCase(gameRepository);
	const playCardUseCase = new ChooseCardUseCase(gameRepository);
	const nextTurnUseCase = new NextTurnUseCase(gameRepository);
	const nextAgeUseCase = new NextAgeUseCase(gameRepository);

	await startGameUseCase.execute(gameId);

	// Age 1
	await playAge(playCardUseCase, gameId, alice, bob, charlie, nextTurnUseCase);
	printBoard(alice, bob, charlie);

	// End Age 1 and start Age 2
	await nextAgeUseCase.execute(gameId);

	// Age 2
	await playAge(playCardUseCase, gameId, alice, bob, charlie, nextTurnUseCase);
	printBoard(alice, bob, charlie);

	// End Age 2 and start Age 3
	await nextAgeUseCase.execute(gameId);

	// Age 3
	await playAge(playCardUseCase, gameId, alice, bob, charlie, nextTurnUseCase);
	printBoard(alice, bob, charlie);

	// Final War
	await nextAgeUseCase.execute(gameId);

	// End Game
	await new EndGameUsecase(
		gameRepository,
		new PointCalculatorService(),
	).execute(gameId);
	printPlayersScores(game.players);
}

main();

async function playAge(
	playCardUseCase: ChooseCardUseCase,
	gameId: string,
	alice: Player,
	bob: Player,
	charlie: Player,
	nextTurnUseCase: NextTurnUseCase,
) {
	// draw 1
	await allPlayersChooseCard(playCardUseCase, gameId, alice, bob, charlie);
	await nextTurnUseCase.execute(gameId);

	// draw 2
	await allPlayersChooseCard(playCardUseCase, gameId, alice, bob, charlie);
	await nextTurnUseCase.execute(gameId);

	// draw 3
	await allPlayersChooseCard(playCardUseCase, gameId, alice, bob, charlie);
	await nextTurnUseCase.execute(gameId);

	// draw 4
	await allPlayersChooseCard(playCardUseCase, gameId, alice, bob, charlie);
	await nextTurnUseCase.execute(gameId);

	// draw 5
	await allPlayersChooseCard(playCardUseCase, gameId, alice, bob, charlie);
	await nextTurnUseCase.execute(gameId);

	// draw 6
	await allPlayersChooseCard(playCardUseCase, gameId, alice, bob, charlie);
	await nextTurnUseCase.execute(gameId);
}

async function allPlayersChooseCard(
	playCardUseCase: ChooseCardUseCase,
	gameId: string,
	alice: Player,
	bob: Player,
	charlie: Player,
) {
	await playCardUseCase.execute(gameId, "1", alice.cards[0].name);
	await playCardUseCase.execute(gameId, "2", bob.cards[0].name);
	await playCardUseCase.execute(gameId, "3", charlie.cards[0].name);
}

function printBoard(alice: Player, bob: Player, charlie: Player) {
	console.log("====================");
	alice.printBoard();
	bob.printBoard();
	charlie.printBoard();

	alice.printHand();
	bob.printHand();
	charlie.printHand();
}

function printPlayersScores(players: Player[]) {
	players.forEach((player) => {
		console.log(`${player.name} a obtenu ${player.victoryPoints} points`);
	});
}
