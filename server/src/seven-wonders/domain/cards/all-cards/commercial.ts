import type { Player } from "../../player.entity";
import { Resource } from "../../resource";
import { Card } from "../card.value-object";
import { CardType } from "../card-type";
import { CommercialCard } from "../commercial-card";

// AGE 1
export const taverne1 = new Card("Taverne", CardType.COMMERCIAL, 4, 1, [], 0);
export const taverne2 = new Card("Taverne", CardType.COMMERCIAL, 5, 1, [], 0);
export const taverne3 = new Card("Taverne", CardType.COMMERCIAL, 7, 1, [], 0);
export const comptoirEst1 = new Card(
	"Comptoir Est",
	CardType.COMMERCIAL,
	3,
	1,
	[],
	0,
);
export const comptoirEst2 = new Card(
	"Comptoir Est",
	CardType.COMMERCIAL,
	7,
	1,
	[],
	0,
);
export const comptoirOuest1 = new Card(
	"Comptoir Ouest",
	CardType.COMMERCIAL,
	3,
	1,
	[],
	0,
);
export const comptoirOuest2 = new Card(
	"Comptoir Ouest",
	CardType.COMMERCIAL,
	7,
	1,
	[],
	0,
);
export const marche1 = new Card("Marché", CardType.COMMERCIAL, 3, 1, [], 0);
export const marche2 = new Card("Marché", CardType.COMMERCIAL, 6, 1, [], 0);

// AGE 2
export const forum1 = new Card(
	"Forum",
	CardType.COMMERCIAL,
	3,
	2,
	[Resource.ARGILE, Resource.ARGILE],
	0,
);
export const forum2 = new Card(
	"Forum",
	CardType.COMMERCIAL,
	6,
	2,
	[Resource.ARGILE, Resource.ARGILE],
	0,
);
export const forum3 = new Card(
	"Forum",
	CardType.COMMERCIAL,
	7,
	2,
	[Resource.ARGILE, Resource.ARGILE],
	0,
);
export const caravanserail1 = new Card(
	"Caravansérail",
	CardType.COMMERCIAL,
	3,
	2,
	[Resource.BOIS, Resource.BOIS],
	0,
);
export const caravanserail2 = new Card(
	"Caravansérail",
	CardType.COMMERCIAL,
	5,
	2,
	[Resource.BOIS, Resource.BOIS],
	0,
);
export const caravanserail3 = new Card(
	"Caravansérail",
	CardType.COMMERCIAL,
	6,
	2,
	[Resource.BOIS, Resource.BOIS],
	0,
);
export const vignoble1 = new Card("Vignoble", CardType.COMMERCIAL, 3, 2, [], 0);
export const vignoble2 = new Card("Vignoble", CardType.COMMERCIAL, 6, 2, [], 0);
export const bazar1 = new Card("Bazar", CardType.COMMERCIAL, 4, 2, [], 0);
export const bazar2 = new Card("Bazar", CardType.COMMERCIAL, 7, 2, [], 0);

// AGE 3
function portCivilizationPointsEarned(player: Player) {
	const rawMaterialCard = player.board.filter(
		(card) => card.type === CardType.RAW_MATERIAL,
	);
	return rawMaterialCard?.length;
}

const noCoinsEarned = () => 0;

export const port1 = new CommercialCard(
	"Port",
	3,
	3,
	portCivilizationPointsEarned,
	noCoinsEarned,
	[Resource.BOIS, Resource.MINERAI, Resource.TISSU],
	0,
);
export const port2 = new CommercialCard(
	"Port",
	4,
	3,
	portCivilizationPointsEarned,
	noCoinsEarned,
	[Resource.BOIS, Resource.MINERAI, Resource.TISSU],
	0,
);

function chambreDeCommerceCivilizationPointsEarned(player: Player) {
	const rawMaterialCard = player.board.filter(
		(card) => card.type === CardType.MANUFACTURED_GOOD,
	);
	return rawMaterialCard?.length * 2;
}

export const chambreDeCommerce1 = new CommercialCard(
	"Chambre de commerce",
	4,
	3,
	chambreDeCommerceCivilizationPointsEarned,
	noCoinsEarned,
	[Resource.ARGILE, Resource.ARGILE, Resource.PAPYRUS],
	0,
);
export const chambreDeCommerce2 = new CommercialCard(
	"Chambre de commerce",
	6,
	3,
	chambreDeCommerceCivilizationPointsEarned,
	noCoinsEarned,
	[Resource.ARGILE, Resource.ARGILE, Resource.PAPYRUS],
	0,
);

export const phareCivilizationPointsEarned = (player: Player) => {
	const rawMaterialCard = player.board.filter(
		(card) => card.type === CardType.COMMERCIAL,
	);
	return rawMaterialCard?.length;
};
export const phare1 = new CommercialCard(
	"Phare",
	3,
	3,
	phareCivilizationPointsEarned,
	noCoinsEarned,
	[Resource.PIERRE, Resource.VERRE],
	0,
);
export const phare2 = new CommercialCard(
	"Phare",
	6,
	3,
	phareCivilizationPointsEarned,
	noCoinsEarned,
	[Resource.PIERRE, Resource.VERRE],
	0,
);

export const arene1 = new Card(
	"Arène",
	CardType.COMMERCIAL,
	3,
	3,
	[Resource.ARGILE, Resource.ARGILE, Resource.MINERAI],
	0,
);
export const arene2 = new Card(
	"Arène",
	CardType.COMMERCIAL,
	5,
	3,
	[Resource.ARGILE, Resource.ARGILE, Resource.MINERAI],
	0,
);

export const ludusCivilizationPointsEarned = (player: Player) => {
	const rawMaterialCard = player.board.filter(
		(card) => card.type === CardType.MILITARY,
	);
	return rawMaterialCard?.length;
};

export const ludus1 = new CommercialCard(
	"Ludus",
	5,
	3,
	ludusCivilizationPointsEarned,
	noCoinsEarned,
	[Resource.PIERRE, Resource.MINERAI],
	0,
);
export const ludus2 = new CommercialCard(
	"Ludus",
	7,
	3,
	ludusCivilizationPointsEarned,
	noCoinsEarned,
	[Resource.PIERRE, Resource.MINERAI],
	0,
);
