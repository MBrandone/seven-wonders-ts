import { CommercialCard } from "src/seven-wonders/domain/cards/commercial-card";
import { CardType } from "../../domain/cards/card-type";
import { GuildCard } from "../../domain/cards/guild-card";
import { Player } from "../../domain/player.entity";
import { SevenWondersGame } from "../../domain/seven-wonders-game";

export class PointCalculatorService {
	calculateCivilianPoints(_player: Player) {}

	calculateMilitaryPoints(_player: Player) {}

	calculateSciencePoints(_player: Player) {}

	calculateGuildPoints(player: Player, game: SevenWondersGame) {
		const guildCards: GuildCard[] = player.board.filter(
			(card) => card.type === CardType.GUILD,
		) as GuildCard[];
		let points = 0;
		guildCards.forEach((card) => {
			if (card.civilizationPointsEarned) {
				points += card.civilizationPointsEarned(player, game);
			}
		});
		return points;
	}

	calculateCommercialPoints(player: Player): number {
		const commercialCards: CommercialCard[] = player.board.filter(
			(card) => card.type === CardType.COMMERCIAL,
		) as CommercialCard[];
		let points = 0;
		commercialCards.forEach((card) => {
			if (card.civilizationPointsEarned) {
				points += card.civilizationPointsEarned(player);
			}
		});
		return points;
	}

	calculateCoinsPoints(_player: Player) {}

	calculateWondersPoints(_player: Player) {}
}
