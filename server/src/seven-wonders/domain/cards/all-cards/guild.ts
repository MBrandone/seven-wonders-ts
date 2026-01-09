// Guildes
import type { Player } from "../../player.entity";
import { Resource } from "../../resource";
import type { SevenWondersGame } from "../../seven-wonders-game";
import { Card } from "../card.value-object";
import { CardType } from "../card-type";
import { GuildCard } from "../guild-card";

// A METTRE A JOUR
const GUILD_COST = [
	Resource.PIERRE,
	Resource.PIERRE,
	Resource.MINERAI,
	Resource.PAPYRUS,
	Resource.VERRE,
	Resource.TISSU,
];

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
	GUILD_COST,
	0,
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
	GUILD_COST,
	0,
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
	GUILD_COST,
	0,
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
	GUILD_COST,
	0,
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
	GUILD_COST,
	0,
);
export const guildeDesArmateurs1 = new GuildCard(
	"Guilde des armateurs",
	3,
	3,
	(player: Player): number => {
		return player.board.filter((card) =>
			[
				CardType.RAW_MATERIAL,
				CardType.MANUFACTURED_GOOD,
				CardType.GUILD,
			].includes(card.type),
		).length;
	},
	GUILD_COST,
	0,
);
export const guildeDesScientifiques1 = new Card(
	"Guilde des scientifiques",
	CardType.GUILD,
	3,
	3,
	GUILD_COST,
	0,
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
	GUILD_COST,
	0,
);
export const guildeDesBatisseurs1 = new Card(
	"Guilde des bâtisseurs",
	CardType.GUILD,
	3,
	3,
	GUILD_COST,
	0,
);
export const guildeDesDecorateurs1 = new Card(
	"Guilde des décorateurs",
	CardType.GUILD,
	3,
	3,
	GUILD_COST,
	0,
);
