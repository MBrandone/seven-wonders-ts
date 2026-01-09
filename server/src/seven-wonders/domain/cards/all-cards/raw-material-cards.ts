import { Resource } from "../../resource";
import { RawMaterialCard } from "../raw-material-card";

// Age 1
export const chantier1 = new RawMaterialCard("Chantier", 3, 1, [Resource.BOIS], 1, [], 0);
export const chantier2 = new RawMaterialCard("Chantier", 4, 1, [Resource.BOIS], 1, [], 0);
export const cavite1 = new RawMaterialCard("Cavité", 3, 1, [Resource.PIERRE], 1, [], 0);
export const cavite2 = new RawMaterialCard("Cavité", 5, 1, [Resource.PIERRE], 1, [], 0);
export const bassinArgileux1 = new RawMaterialCard(
	"Bassin Argileux",
	3,
	1,
	[Resource.ARGILE],
	1,
	[],
	0,
);
export const bassinArgileux2 = new RawMaterialCard(
	"Bassin Argileux",
	5,
	1,
	[Resource.ARGILE],
	1,
	[],
	0,
);
export const filon1 = new RawMaterialCard("Filon", 3, 1, [Resource.MINERAI], 1, [], 0);
export const filon2 = new RawMaterialCard("Filon", 4, 1, [Resource.MINERAI], 1, [], 0);
export const friche = new RawMaterialCard("Friche", 6, 1, [Resource.BOIS, Resource.ARGILE], 1, [], 1);
export const excavation = new RawMaterialCard("Excavation", 4, 1, [Resource.PIERRE, Resource.ARGILE], 1, [], 1);
export const fosseArgileuse = new RawMaterialCard(
	"Fosse Argileuse",
	3,
	1,
	[Resource.ARGILE, Resource.MINERAI],
	1,
	[],
	1,
);
export const exploitationForestiere = new RawMaterialCard(
	"Exploitation Forestière",
	3,
	1,
	[Resource.BOIS, Resource.PIERRE],
	1,
	[],
	1,
);
export const gisement = new RawMaterialCard("Gisement", 5, 1, [Resource.MINERAI, Resource.BOIS], 1, [], 1);
export const mine = new RawMaterialCard("Mine", 6, 1, [Resource.MINERAI, Resource.PIERRE], 1, [], 1);

// Age 2
export const scierie1 = new RawMaterialCard("Scierie", 3, 2, [Resource.BOIS, Resource.BOIS], 2, [], 1);
export const scierie2 = new RawMaterialCard("Scierie", 4, 2, [Resource.BOIS, Resource.BOIS], 2, [], 1);
export const carriere1 = new RawMaterialCard("Carrière", 3, 2, [Resource.PIERRE, Resource.PIERRE], 2, [], 1);
export const carriere2 = new RawMaterialCard("Carrière", 4, 2, [Resource.PIERRE, Resource.PIERRE], 2, [], 1);
export const briquetterie1 = new RawMaterialCard(
	"Briquetterie",
	3,
	2,
	[Resource.ARGILE, Resource.ARGILE],
	2,
	[],
	1,
);
export const briquetterie2 = new RawMaterialCard(
	"Briquetterie",
	4,
	2,
	[Resource.ARGILE, Resource.ARGILE],
	2,
	[],
	1,
);
export const fonderie1 = new RawMaterialCard("Fonderie", 3, 2, [Resource.MINERAI, Resource.MINERAI], 2, [], 1);
export const fonderie2 = new RawMaterialCard("Fonderie", 4, 2, [Resource.MINERAI, Resource.MINERAI], 2, [], 1);
