// Guildes

import type { Player } from "../../player.entity";
import type { SevenWondersGame } from "../../seven-wonders-game";
import { Card } from "../card.value-object";
import { CardType } from "../card-type";
import { GuildCard } from "../guild-card";

export const guildeDesTravailleurs1 = new GuildCard(
	"Guilde des travailleurs",
	3,
	3,
	(player: Player, game: SevenWondersGame): number => {
		return game
			.getNeighbours(player)
			.flatMap((player) =>
				player.board.filter((card) => card.type === CardType.RAW_MATERIAL),
			).length;
	},
);
export const guildeDesArtisans1 = new GuildCard(
	"Guilde des artisans",
	3,
	3,
	(player: Player, game: SevenWondersGame): number => {
		return (
			game
				.getNeighbours(player)
				.flatMap((player) =>
					player.board.filter(
						(card) => card.type === CardType.MANUFACTURED_GOOD,
					),
				).length * 2
		);
	},
);
export const guildeDesCommercants1 = new GuildCard(
	"Guilde des commerçants",
	3,
	3,
	(player: Player, game: SevenWondersGame): number => {
		return game
			.getNeighbours(player)
			.flatMap((player) =>
				player.board.filter((card) => card.type === CardType.COMMERCIAL),
			).length;
	},
);
export const guildeDesPhilosophes1 = new GuildCard(
	"Guilde des philosophes",
	3,
	3,
	(player: Player, game: SevenWondersGame): number => {
		return game
			.getNeighbours(player)
			.flatMap((player) =>
				player.board.filter((card) => card.type === CardType.SCIENCE),
			).length;
	},
);
export const guildeDesEspions1 = new GuildCard(
	"Guilde des espions",
	3,
	3,
	(player: Player, game: SevenWondersGame): number => {
		return game
			.getNeighbours(player)
			.flatMap((player) =>
				player.board.filter((card) => card.type === CardType.MILITARY),
			).length;
	},
);
export const guildeDesArmateurs1 = new GuildCard(
	"Guilde des armateurs",
	3,
	3,
	(player: Player, game: SevenWondersGame): number => {
		return player.board.filter((card) =>
			[
				CardType.RAW_MATERIAL,
				CardType.MANUFACTURED_GOOD,
				CardType.GUILD,
			].includes(card.type),
		).length;
	},
);
export const guildeDesScientifiques1 = new Card(
	"Guilde des scientifiques",
	CardType.GUILD,
	3,
	3,
);
export const guildeDesMagistrats1 = new GuildCard(
	"Guilde des magistrats",
	3,
	3,
	(player: Player, game: SevenWondersGame): number => {
		return game
			.getNeighbours(player)
			.flatMap((player) =>
				player.board.filter((card) => card.type === CardType.CIVIL),
			).length;
	},
);
export const guildeDesBatisseurs1 = new Card(
	"Guilde des bâtisseurs",
	CardType.GUILD,
	3,
	3,
);
export const guildeDesDecorateurs1 = new Card(
	"Guilde des décorateurs",
	CardType.GUILD,
	3,
	3,
);
