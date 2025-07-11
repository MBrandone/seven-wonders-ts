import type { Player } from "../../player.entity";
import { Card, CommercialCard } from "../card.value-object";
import { CardType } from "../card-type";

// AGE 1
export const taverne1 = new Card("Taverne", CardType.COMMERCIAL, 4, 1);
export const taverne2 = new Card("Taverne", CardType.COMMERCIAL, 5, 1);
export const taverne3 = new Card("Taverne", CardType.COMMERCIAL, 7, 1);
export const comptoirEst1 = new Card("Comptoir Est", CardType.COMMERCIAL, 3, 1);
export const comptoirEst2 = new Card("Comptoir Est", CardType.COMMERCIAL, 7, 1);
export const comptoirOuest1 = new Card(
	"Comptoir Ouest",
	CardType.COMMERCIAL,
	3,
	1,
);
export const comptoirOuest2 = new Card(
	"Comptoir Ouest",
	CardType.COMMERCIAL,
	7,
	1,
);
export const marche1 = new Card("Marché", CardType.COMMERCIAL, 3, 1);
export const marche2 = new Card("Marché", CardType.COMMERCIAL, 6, 1);

// AGE 2
export const forum1 = new Card("Forum", CardType.COMMERCIAL, 3, 2);
export const forum2 = new Card("Forum", CardType.COMMERCIAL, 6, 2);
export const forum3 = new Card("Forum", CardType.COMMERCIAL, 7, 2);
export const caravanserail1 = new Card(
	"Caravansérail",
	CardType.COMMERCIAL,
	3,
	2,
);
export const caravanserail2 = new Card(
	"Caravansérail",
	CardType.COMMERCIAL,
	5,
	2,
);
export const caravanserail3 = new Card(
	"Caravansérail",
	CardType.COMMERCIAL,
	6,
	2,
);
export const vignoble1 = new Card("Vignoble", CardType.COMMERCIAL, 3, 2);
export const vignoble2 = new Card("Vignoble", CardType.COMMERCIAL, 6, 2);
export const bazar1 = new Card("Bazar", CardType.COMMERCIAL, 4, 2);
export const bazar2 = new Card("Bazar", CardType.COMMERCIAL, 7, 2);

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
);
export const port2 = new CommercialCard(
	"Port",
	4,
	3,
	portCivilizationPointsEarned,
	noCoinsEarned,
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
);
export const chambreDeCommerce2 = new CommercialCard(
	"Chambre de commerce",
	6,
	3,
	chambreDeCommerceCivilizationPointsEarned,
	noCoinsEarned,
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
);
export const phare2 = new CommercialCard(
	"Phare",
	6,
	3,
	phareCivilizationPointsEarned,
	noCoinsEarned,
);

export const arene1 = new Card("Arène", CardType.COMMERCIAL, 3, 3);
export const arene2 = new Card("Arène", CardType.COMMERCIAL, 5, 3);

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
);
export const ludus2 = new CommercialCard(
	"Ludus",
	7,
	3,
	ludusCivilizationPointsEarned,
	noCoinsEarned,
);
