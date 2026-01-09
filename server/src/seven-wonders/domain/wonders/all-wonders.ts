import { Resource } from "../resource";
import { Wonder } from "./wonder.entity";

export const colosseDeRhodes = new Wonder(
	"Le Colosse de Rhodes",
	Resource.MINERAI,
	[],
);
export const phareDAlexandrie = new Wonder(
	"Le Phare d’Alexandrie",
	Resource.VERRE,
	[],
);
export const pyramideDeGizeh = new Wonder(
	"La Pyramide de Gizeh",
	Resource.PIERRE,
	[],
);
export const mausoleeDHalicarnasse = new Wonder(
	"Le Mausolée d’Halicarnasse",
	Resource.TISSU,
	[],
);
export const statueDeZeusAOlympie = new Wonder(
	"La Statue de Zeus à Olympie",
	Resource.ARGILE,
	[],
);
export const templeDArtemisAEphese = new Wonder(
	"Le Temple d’Artémis à Éphèse",
	Resource.PAPYRUS,
	[],
);
export const jardinsSuspendusDeBabylone = new Wonder(
	"Les Jardins suspendus de Babylone",
	Resource.BOIS,
	[],
);

export const ALL_WONDERS: Wonder[] = [
	colosseDeRhodes,
	phareDAlexandrie,
	pyramideDeGizeh,
	mausoleeDHalicarnasse,
	statueDeZeusAOlympie,
	templeDArtemisAEphese,
	jardinsSuspendusDeBabylone,
];
