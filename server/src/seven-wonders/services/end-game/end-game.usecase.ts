import type {
	CivilianCard,
	ScienceCard,
} from "../../domain/cards/card.value-object";
import { CardType } from "../../domain/cards/card-type";
import { ScienceSymbol } from "../../domain/cards/science-symbol";
import type { GameRepository } from "../../domain/game-repository";
import type { Player } from "../../domain/player.entity";

export class EndGameUsecase {
	constructor(private readonly gameRepository: GameRepository) {}

	async execute(gameId: string): Promise<void> {
		const game = await this.gameRepository.findById(gameId);

		if (!game) {
			throw new Error(`Game with id ${gameId} not found`);
		}

		for (const player of game.players) {
			const wonderPoints = this.calculateWonderPoints(player);
			const coinPoints = Math.floor(player.coins / 3);
			const militaryPoints = this.calculateMilitaryPoints(player);
			const civilianPoints = this.calculateCivilianPoints(player);
			const commercialPoints = this.calculateCommercialPoints(player);
			const sciencePoints = this.calculateSciencePoints(player);
			const guildPoints = this.calculateGuildPoints(player);

			player.victoryPoints =
				wonderPoints +
				coinPoints +
				militaryPoints +
				civilianPoints +
				commercialPoints +
				sciencePoints +
				guildPoints;
		}
	}

	private calculateWonderPoints(player: Player): number {
		return player.wonder.stages
			.filter((stage) => stage.isBuilt)
			.reduce((sum, stage) => sum + (stage.civilizationPoints || 0), 0);
	}

	private calculateMilitaryPoints(player: Player): number {
		let points = 0;

		// Comptage des jetons militaires par âge
		for (const token of player.militaryTokens) {
			if (token.isDefeat) {
				points -= 1; // Jeton de défaite: -1 point
			} else {
				// Jeton de victoire: points selon l'âge
				switch (token.age) {
					case 1:
						points += 1;
						break;
					case 2:
						points += 3;
						break;
					case 3:
						points += 5;
						break;
				}
			}
		}

		return points;
	}

	private calculateCivilianPoints(player: Player): number {
		const civilianPoints = player.board
			.filter((card) => card.type === CardType.CIVIL)
			.reduce(
				(sum, card: CivilianCard) => sum + (card.civilizationPoints || 0),
				0,
			);
		return civilianPoints;
	}

	private calculateCommercialPoints(player: Player): number {
		return player.board
			.filter((card) => card.type === CardType.COMMERCIAL)
			.reduce(
				(sum, card: CivilianCard) => sum + (card.civilizationPoints || 0),
				0,
			);
	}

	private calculateGuildPoints(player: Player): number {
		return player.board
			.filter((card) => card.type === CardType.GUILD)
			.reduce(
				(sum, card: CivilianCard) => sum + (card.civilizationPoints || 0),
				0,
			);
	}

	private calculateSciencePoints(player: Player): number {
		const scienceCards: ScienceCard[] = player.board.filter(
			(card) => card.type === CardType.SCIENCE,
		) as ScienceCard[];
		const symbolCounts = {
			[ScienceSymbol.TABLET]: 0,
			[ScienceSymbol.COMPASS]: 0,
			[ScienceSymbol.WHEEL]: 0,
		};

		for (const card of scienceCards) {
			symbolCounts[card.scienceSymbol as ScienceSymbol]++;
		}

		const verticalPoints = Object.values(symbolCounts).reduce(
			(sum, count) => sum + count * count,
			0,
		);

		const minSymbolCount = Math.min(
			symbolCounts[ScienceSymbol.TABLET],
			symbolCounts[ScienceSymbol.COMPASS],
			symbolCounts[ScienceSymbol.WHEEL],
		);
		const horizontalPoints = minSymbolCount * 7;

		return verticalPoints + horizontalPoints;
	}
}
