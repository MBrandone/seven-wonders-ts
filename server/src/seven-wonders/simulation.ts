import { ChooseCardCommandHandler } from "./domain/command-handlers/choose-card-command-handler";
import { EndGameCommandHandler } from "./domain/command-handlers/end-game-command-handler";
import { NextAgeCommandHandler } from "./domain/command-handlers/next-age-command-handler";
import { NextTurnCommandHandler } from "./domain/command-handlers/next-turn-command-handler";
import { StartGameCommandHandler } from "./domain/command-handlers/start-game-command-handler";
import { SevenWondersGameRepository } from "./domain/game-repository";
import { Player } from "./domain/player.entity";
import { PointCalculatorService } from "./domain/point-calculator/point-calculator.service";
import { SevenWondersGame } from "./domain/seven-wonders-game";

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
		addGame: () => Promise.resolve(),
	};

	const startGameCommandHandler = new StartGameCommandHandler(gameRepository);
	const chooseCardCommandHandler = new ChooseCardCommandHandler(gameRepository);
	const nextTurnCommandHandler = new NextTurnCommandHandler(gameRepository);
	const nextAgeCommandHandler = new NextAgeCommandHandler(gameRepository);

	await startGameCommandHandler.handle({ gameId });

	// Age 1
	await playAge(
		chooseCardCommandHandler,
		gameId,
		alice,
		bob,
		charlie,
		nextTurnCommandHandler,
	);
	printBoard(alice, bob, charlie);

	// End Age 1 and start Age 2
	await nextAgeCommandHandler.handle({ gameId });

	// Age 2
	await playAge(
		chooseCardCommandHandler,
		gameId,
		alice,
		bob,
		charlie,
		nextTurnCommandHandler,
	);
	printBoard(alice, bob, charlie);

	// End Age 2 and start Age 3
	await nextAgeCommandHandler.handle({ gameId });

	// Age 3
	await playAge(
		chooseCardCommandHandler,
		gameId,
		alice,
		bob,
		charlie,
		nextTurnCommandHandler,
	);
	printBoard(alice, bob, charlie);

	// Final War
	await nextAgeCommandHandler.handle({ gameId });

	// End Game
	await new EndGameCommandHandler(
		gameRepository,
		new PointCalculatorService(),
	).handle({ gameId });
	printPlayersScores(game.players);
}

main();

async function playAge(
	chooseCardCommandHandler: ChooseCardCommandHandler,
	gameId: string,
	alice: Player,
	bob: Player,
	charlie: Player,
	nextTurnCommandHandler: NextTurnCommandHandler,
) {
	// draw 1
	await allPlayersChooseCard(
		chooseCardCommandHandler,
		gameId,
		alice,
		bob,
		charlie,
	);
	await nextTurnCommandHandler.handle({ gameId });

	// draw 2
	await allPlayersChooseCard(
		chooseCardCommandHandler,
		gameId,
		alice,
		bob,
		charlie,
	);
	await nextTurnCommandHandler.handle({ gameId });

	// draw 3
	await allPlayersChooseCard(
		chooseCardCommandHandler,
		gameId,
		alice,
		bob,
		charlie,
	);
	await nextTurnCommandHandler.handle({ gameId });

	// draw 4
	await allPlayersChooseCard(
		chooseCardCommandHandler,
		gameId,
		alice,
		bob,
		charlie,
	);
	await nextTurnCommandHandler.handle({ gameId });

	// draw 5
	await allPlayersChooseCard(
		chooseCardCommandHandler,
		gameId,
		alice,
		bob,
		charlie,
	);
	await nextTurnCommandHandler.handle({ gameId });

	// draw 6
	await allPlayersChooseCard(
		chooseCardCommandHandler,
		gameId,
		alice,
		bob,
		charlie,
	);
	await nextTurnCommandHandler.handle({ gameId });
}

async function allPlayersChooseCard(
	chooseCardCommandHandler: ChooseCardCommandHandler,
	gameId: string,
	alice: Player,
	bob: Player,
	charlie: Player,
) {
	await chooseCardCommandHandler.handle({
		gameId,
		playerId: "1",
		cardName: alice.cards[0].name,
	});
	await chooseCardCommandHandler.handle({
		gameId,
		playerId: "2",
		cardName: bob.cards[0].name,
	});
	await chooseCardCommandHandler.handle({
		gameId,
		playerId: "3",
		cardName: charlie.cards[0].name,
	});
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
