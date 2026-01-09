// Bâtiments Civils
import { Resource } from "../../resource";
import { CivilianCard } from "../civilian-card";

// Age 1
export const autel1 = new CivilianCard("Autel", 3, 1, 3, [], 0);
export const autel2 = new CivilianCard("Autel", 5, 1, 3, [], 0);
export const theatre1 = new CivilianCard("Théâtre", 3, 1, 3, [], 0);
export const theatre2 = new CivilianCard("Théâtre", 6, 1, 3, [], 0);
export const bains1 = new CivilianCard("Bains", 3, 1, 3, [Resource.PIERRE], 0);
export const bains2 = new CivilianCard("Bains", 7, 1, 3, [Resource.PIERRE], 0);
export const puits1 = new CivilianCard("Puits", 3, 1, 3, [], 0);
export const puits2 = new CivilianCard("Puits", 7, 1, 3, [], 0);

// Age 2
export const aqueduc1 = new CivilianCard(
	"Aqueduc",
	3,
	2,
	5,
	[Resource.PIERRE, Resource.PIERRE, Resource.PIERRE],
	0,
);
export const aqueduc2 = new CivilianCard(
	"Aqueduc",
	7,
	2,
	5,
	[Resource.PIERRE, Resource.PIERRE, Resource.PIERRE],
	0,
);
export const temple1 = new CivilianCard(
	"Temple",
	3,
	2,
	4,
	[Resource.BOIS, Resource.ARGILE, Resource.VERRE],
	0,
);
export const temple2 = new CivilianCard(
	"Temple",
	6,
	2,
	4,
	[Resource.BOIS, Resource.ARGILE, Resource.VERRE],
	0,
);
export const statue1 = new CivilianCard(
	"Statue",
	3,
	2,
	4,
	[Resource.BOIS, Resource.MINERAI, Resource.MINERAI],
	0,
);
export const statue2 = new CivilianCard(
	"Statue",
	7,
	2,
	4,
	[Resource.BOIS, Resource.MINERAI, Resource.MINERAI],
	0,
);
export const tribunal1 = new CivilianCard(
	"Tribunal",
	3,
	2,
	4,
	[Resource.ARGILE, Resource.ARGILE, Resource.TISSU],
	0,
);
export const tribunal2 = new CivilianCard(
	"Tribunal",
	5,
	2,
	4,
	[Resource.ARGILE, Resource.ARGILE, Resource.TISSU],
	0,
);

// Age 3
export const pantheon1 = new CivilianCard(
	"Panthéon",
	3,
	3,
	7,
	[
		Resource.ARGILE,
		Resource.ARGILE,
		Resource.MINERAI,
		Resource.VERRE,
		Resource.TISSU,
		Resource.PAPYRUS,
	],
	0,
);
export const pantheon2 = new CivilianCard(
	"Panthéon",
	6,
	3,
	7,
	[
		Resource.ARGILE,
		Resource.ARGILE,
		Resource.MINERAI,
		Resource.VERRE,
		Resource.TISSU,
		Resource.PAPYRUS,
	],
	0,
);
export const jardins1 = new CivilianCard(
	"Jardins",
	3,
	3,
	5,
	[Resource.ARGILE, Resource.ARGILE, Resource.BOIS],
	0,
);
export const jardins2 = new CivilianCard(
	"Jardins",
	4,
	3,
	5,
	[Resource.ARGILE, Resource.ARGILE, Resource.BOIS],
	0,
);
export const hotelDeVille1 = new CivilianCard(
	"Hôtel de ville",
	3,
	3,
	6,
	[Resource.PIERRE, Resource.PIERRE, Resource.PIERRE, Resource.VERRE],
	0,
);
export const hotelDeVille2 = new CivilianCard(
	"Hôtel de ville",
	6,
	3,
	6,
	[Resource.PIERRE, Resource.PIERRE, Resource.PIERRE, Resource.VERRE],
	0,
);
export const palace1 = new CivilianCard(
	"Palace",
	3,
	3,
	8,
	[
		Resource.BOIS,
		Resource.PIERRE,
		Resource.ARGILE,
		Resource.MINERAI,
		Resource.VERRE,
		Resource.TISSU,
		Resource.PAPYRUS,
	],
	0,
);
export const palace2 = new CivilianCard(
	"Palace",
	7,
	3,
	8,
	[
		Resource.BOIS,
		Resource.PIERRE,
		Resource.ARGILE,
		Resource.MINERAI,
		Resource.VERRE,
		Resource.TISSU,
		Resource.PAPYRUS,
	],
	0,
);
export const senat1 = new CivilianCard(
	"Sénat",
	3,
	3,
	6,
	[Resource.BOIS, Resource.BOIS, Resource.MINERAI, Resource.PIERRE],
	0,
);
export const senat2 = new CivilianCard(
	"Sénat",
	5,
	3,
	6,
	[Resource.BOIS, Resource.BOIS, Resource.MINERAI, Resource.PIERRE],
	0,
);
