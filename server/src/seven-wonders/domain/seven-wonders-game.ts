import type { Deck } from "./deck/deck.entity";
import type { Player } from "./player.entity";
import type { Wonder } from "./wonder.entity";

export class SevenWondersGame {
	wonders: Wonder[];
	deck: Deck;
	currentAge: 1 | 2 | 3 = 1;

	constructor(
		public readonly id: string,
		public players: Player[],
	) {}

	assignWonders(wonders: Wonder[]) {
		this.wonders = wonders.sort(() => Math.random() - 0.5);
		this.players.forEach((player, index) => {
			player.wonder = this.wonders[index];
		});
	}

	assignCards(deck: Deck) {
		this.deck = deck;
		const shuffledCardsToAssign = deck
			.getCardsForAge(1, this.players.length)
			.sort(() => Math.random() - 0.5);
		this.players.forEach((player, index) => {
			const cardsToGive = shuffledCardsToAssign.slice(
				index * 7,
				(index + 1) * 7,
			);
			player.takeCards(cardsToGive);
		});
	}

	nextAge() {
		const howManyPlayers = this.players.length;
		for (let i = 0; i < howManyPlayers; i++) {
			const currentPlayer = this.players[i];
			const leftNeighbour =
				this.players[(i - 1 + howManyPlayers) % howManyPlayers];
			const rightNeighbour = this.players[(i + 1) % howManyPlayers];
			this.resolveWar(currentPlayer, leftNeighbour);
			this.resolveWar(currentPlayer, rightNeighbour);
		}

		if (this.currentAge < 3) {
			this.currentAge = (this.currentAge + 1) as 1 | 2 | 3;

			const shuffledCardsToAssign = this.deck
				.getCardsForAge(this.currentAge, howManyPlayers)
				.sort(() => Math.random() - 0.5);
			this.players.forEach((player, index) => {
				const cardsToGive = shuffledCardsToAssign.slice(
					index * 7,
					(index + 1) * 7,
				);
				player.takeCards(cardsToGive);
			});
		}
	}

	private resolveWar(player: Player, opponent: Player) {
		if (player.militaryStrength() > opponent.militaryStrength()) {
			player.takeWarVictoryToken();
		} else if (player.militaryStrength() < opponent.militaryStrength()) {
			player.takeWarDefeatToken();
		}
	}

	getNeighbours(player: Player) {
		const index = this.players.findIndex(
			(playerInGame) => playerInGame === player,
		);
		const playerLength = this.players.length;
		if (index === 0) {
			return [this.players[1], this.players[playerLength - 1]];
		} else if (index === playerLength - 1) {
			return [this.players[0], this.players[playerLength - 2]];
		} else {
			return [this.players[index - 1], this.players[index + 1]];
		}
	}
}
