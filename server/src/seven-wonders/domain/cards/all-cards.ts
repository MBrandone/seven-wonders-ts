import {
	Card,
	CivilianCard,
	MilitaryCard,
	ScienceCard,
} from "./card.value-object";
import { CardType } from "./card-type";
import { ScienceSymbol } from "./science-symbol";

// Matières Premières
export const chantier1 = new Card("Chantier", CardType.RAW_MATERIAL, 3, 1);
export const chantier2 = new Card("Chantier", CardType.RAW_MATERIAL, 4, 1);
export const cavite1 = new Card("Cavité", CardType.RAW_MATERIAL, 3, 1);
export const cavite2 = new Card("Cavité", CardType.RAW_MATERIAL, 5, 1);
export const bassinArgileux1 = new Card(
	"Bassin Argileux",
	CardType.RAW_MATERIAL,
	3,
	1,
);
export const bassinArgileux2 = new Card(
	"Bassin Argileux",
	CardType.RAW_MATERIAL,
	5,
	1,
);
export const filon1 = new Card("Filon", CardType.RAW_MATERIAL, 3, 1);
export const filon2 = new Card("Filon", CardType.RAW_MATERIAL, 4, 1);
export const friche = new Card("Friche", CardType.RAW_MATERIAL, 6, 1);
export const excavation = new Card("Excavation", CardType.RAW_MATERIAL, 4, 1);
export const fosseArgileuse = new Card(
	"Fosse Argileuse",
	CardType.RAW_MATERIAL,
	3,
	1,
);
export const exploitationForestiere = new Card(
	"Exploitation Forestière",
	CardType.RAW_MATERIAL,
	3,
	1,
);
export const gisement = new Card("Gisement", CardType.RAW_MATERIAL, 5, 1);
export const mine = new Card("Mine", CardType.RAW_MATERIAL, 6, 1);
export const scierie1 = new Card("Scierie", CardType.RAW_MATERIAL, 3, 2);
export const scierie2 = new Card("Scierie", CardType.RAW_MATERIAL, 4, 2);
export const carriere1 = new Card("Carrière", CardType.RAW_MATERIAL, 3, 2);
export const carriere2 = new Card("Carrière", CardType.RAW_MATERIAL, 4, 2);
export const briquetterie1 = new Card(
	"Briquetterie",
	CardType.RAW_MATERIAL,
	3,
	2,
);
export const briquetterie2 = new Card(
	"Briquetterie",
	CardType.RAW_MATERIAL,
	4,
	2,
);
export const fonderie1 = new Card("Fonderie", CardType.RAW_MATERIAL, 3, 2);
export const fonderie2 = new Card("Fonderie", CardType.RAW_MATERIAL, 4, 2);

// Produits Manufacturés
export const verrerie1 = new Card("Verrerie", CardType.MANUFACTURED_GOOD, 3, 1);
export const verrerie2 = new Card("Verrerie", CardType.MANUFACTURED_GOOD, 6, 1);
export const presse1 = new Card("Presse", CardType.MANUFACTURED_GOOD, 3, 1);
export const presse2 = new Card("Presse", CardType.MANUFACTURED_GOOD, 6, 1);
export const metierATisser1 = new Card(
	"Métier à Tisser",
	CardType.MANUFACTURED_GOOD,
	3,
	1,
);
export const metierATisser2 = new Card(
	"Métier à Tisser",
	CardType.MANUFACTURED_GOOD,
	6,
	1,
);

export const verrerie3 = new Card("Verrerie", CardType.MANUFACTURED_GOOD, 3, 2);
export const verrerie4 = new Card("Verrerie", CardType.MANUFACTURED_GOOD, 5, 2);
export const presse3 = new Card("Presse", CardType.MANUFACTURED_GOOD, 3, 2);
export const presse4 = new Card("Presse", CardType.MANUFACTURED_GOOD, 5, 2);
export const metierATisser3 = new Card(
	"Métier à Tisser",
	CardType.MANUFACTURED_GOOD,
	3,
	2,
);
export const metierATisser4 = new Card(
	"Métier à Tisser",
	CardType.MANUFACTURED_GOOD,
	5,
	2,
);

// Bâtiments Militaires
export const palissade1 = new MilitaryCard("Palissade", 3, 1, 1);
export const palissade2 = new MilitaryCard("Palissade", 7, 1, 1);
export const caserne1 = new MilitaryCard("Caserne", 3, 1, 1);
export const caserne2 = new MilitaryCard("Caserne", 5, 1, 1);
export const tourDeGarde1 = new MilitaryCard("Tour de garde", 3, 1, 1);
export const tourDeGarde2 = new MilitaryCard("Tour de garde", 4, 1, 1);

export const ecuries1 = new MilitaryCard("Écuries", 3, 2, 2);
export const ecuries2 = new MilitaryCard("Écuries", 5, 2, 2);
export const champsDeTir1 = new MilitaryCard("Champs de tir", 3, 2, 2);
export const champsDeTir2 = new MilitaryCard("Champs de tir", 6, 2, 2);
export const muraille1 = new MilitaryCard("Muraille", 3, 2, 2);
export const muraille2 = new MilitaryCard("Muraille", 7, 2, 2);
export const placeDArmes1 = new MilitaryCard("Place d'armes", 4, 2, 2);
export const placeDArmes2 = new MilitaryCard("Place d'armes", 6, 2, 2);
export const placeDArmes3 = new MilitaryCard("Place d'armes", 7, 2, 2);

export const castrum1 = new MilitaryCard("Castrum", 4, 3, 3);
export const castrum2 = new MilitaryCard("Castrum", 7, 3, 3);
export const fortifications1 = new MilitaryCard("Fortifications", 3, 3, 3);
export const fortifications2 = new MilitaryCard("Fortifications", 7, 3, 3);
export const cirque1 = new MilitaryCard("Cirque", 4, 3, 3);
export const cirque2 = new MilitaryCard("Cirque", 6, 3, 3);
export const arsenal1 = new MilitaryCard("Arsenal", 3, 3, 3);
export const arsenal2 = new MilitaryCard("Arsenal", 5, 3, 3);
export const atelierDeSieges1 = new MilitaryCard("Atelier de sièges", 3, 3, 3);
export const atelierDeSieges2 = new MilitaryCard("Atelier de sièges", 5, 3, 3);

// Bâtiments Scientifiques
export const scriptorium1 = new ScienceCard(
	"Scriptorium",
	3,
	1,
	ScienceSymbol.TABLET,
);
export const scriptorium2 = new ScienceCard(
	"Scriptorium",
	4,
	1,
	ScienceSymbol.TABLET,
);
export const atelier1 = new ScienceCard("Atelier", 3, 1, ScienceSymbol.WHEEL);
export const atelier2 = new ScienceCard("Atelier", 7, 1, ScienceSymbol.WHEEL);
export const officine1 = new ScienceCard(
	"Officine",
	3,
	1,
	ScienceSymbol.COMPASS,
);
export const officine2 = new ScienceCard(
	"Officine",
	5,
	1,
	ScienceSymbol.COMPASS,
);

export const laboratoire1 = new ScienceCard(
	"Laboratoire",
	3,
	2,
	ScienceSymbol.WHEEL,
);
export const laboratoire2 = new ScienceCard(
	"Laboratoire",
	5,
	2,
	ScienceSymbol.WHEEL,
);
export const bibliotheque1 = new ScienceCard(
	"Bibliothèque",
	3,
	2,
	ScienceSymbol.TABLET,
);
export const bibliotheque2 = new ScienceCard(
	"Bibliothèque",
	6,
	2,
	ScienceSymbol.TABLET,
);
export const ecole1 = new ScienceCard("École", 3, 2, ScienceSymbol.TABLET);
export const ecole2 = new ScienceCard("École", 7, 2, ScienceSymbol.TABLET);
export const dispensaire1 = new ScienceCard(
	"Dispensaire",
	3,
	2,
	ScienceSymbol.COMPASS,
);
export const dispensaire2 = new ScienceCard(
	"Dispensaire",
	4,
	2,
	ScienceSymbol.COMPASS,
);

export const academie1 = new ScienceCard(
	"Académie",
	3,
	3,
	ScienceSymbol.COMPASS,
);
export const academie2 = new ScienceCard(
	"Académie",
	7,
	3,
	ScienceSymbol.COMPASS,
);
export const observatoire1 = new ScienceCard(
	"Observatoire",
	3,
	3,
	ScienceSymbol.WHEEL,
);
export const observatoire2 = new ScienceCard(
	"Observatoire",
	7,
	3,
	ScienceSymbol.WHEEL,
);
export const universite1 = new ScienceCard(
	"Université",
	3,
	3,
	ScienceSymbol.TABLET,
);
export const universite2 = new ScienceCard(
	"Université",
	4,
	3,
	ScienceSymbol.TABLET,
);
export const etude1 = new ScienceCard("Étude", 3, 3, ScienceSymbol.WHEEL);
export const etude2 = new ScienceCard("Étude", 5, 3, ScienceSymbol.WHEEL);
export const loge1 = new ScienceCard("Loge", 3, 3, ScienceSymbol.COMPASS);
export const loge2 = new ScienceCard("Loge", 6, 3, ScienceSymbol.COMPASS);

// Bâtiments Civils
export const autel1 = new CivilianCard("Autel", 3, 1, 3);
export const autel2 = new CivilianCard("Autel", 5, 1, 3);
export const theatre1 = new CivilianCard("Théâtre", 3, 1, 3);
export const theatre2 = new CivilianCard("Théâtre", 6, 1, 3);
export const bains1 = new CivilianCard("Bains", 3, 1, 3);
export const bains2 = new CivilianCard("Bains", 7, 1, 3);
export const puits1 = new CivilianCard("Puits", 3, 1, 3);
export const puits2 = new CivilianCard("Puits", 7, 1, 3);

export const aqueduc1 = new CivilianCard("Aqueduc", 3, 2, 5);
export const aqueduc2 = new CivilianCard("Aqueduc", 7, 2, 5);
export const temple1 = new CivilianCard("Temple", 3, 2, 4);
export const temple2 = new CivilianCard("Temple", 6, 2, 4);
export const statue1 = new CivilianCard("Statue", 3, 2, 4);
export const statue2 = new CivilianCard("Statue", 7, 2, 4);
export const tribunal1 = new CivilianCard("Tribunal", 3, 2, 4);
export const tribunal2 = new CivilianCard("Tribunal", 5, 2, 4);

export const pantheon1 = new CivilianCard("Panthéon", 3, 3, 7);
export const pantheon2 = new CivilianCard("Panthéon", 6, 3, 7);
export const jardins1 = new CivilianCard("Jardins", 3, 3, 5);
export const jardins2 = new CivilianCard("Jardins", 4, 3, 5);
export const hotelDeVille1 = new CivilianCard("Hôtel de ville", 3, 3, 6);
export const hotelDeVille2 = new CivilianCard("Hôtel de ville", 6, 3, 6);
export const palace1 = new CivilianCard("Palace", 3, 3, 8);
export const palace2 = new CivilianCard("Palace", 7, 3, 8);
export const senat1 = new CivilianCard("Sénat", 3, 3, 6);
export const senat2 = new CivilianCard("Sénat", 5, 3, 6);

// Bâtiments Commerciaux
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
export const forum1 = new Card("Forum", CardType.COMMERCIAL, 3, 2);
export const forum2 = new Card("Forum", CardType.COMMERCIAL, 6, 2);
export const forum3 = new Card("Forum", CardType.COMMERCIAL, 7, 2);
export const caravansarai1 = new Card(
	"Caravansérail",
	CardType.COMMERCIAL,
	3,
	2,
);
export const caravansarai2 = new Card(
	"Caravansérail",
	CardType.COMMERCIAL,
	5,
	2,
);
export const caravansarai3 = new Card(
	"Caravansérail",
	CardType.COMMERCIAL,
	6,
	2,
);
export const vignoble1 = new Card("Vignoble", CardType.COMMERCIAL, 3, 2);
export const vignoble2 = new Card("Vignoble", CardType.COMMERCIAL, 6, 2);
export const bazar1 = new Card("Bazar", CardType.COMMERCIAL, 4, 2);
export const bazar2 = new Card("Bazar", CardType.COMMERCIAL, 7, 2);
export const port1 = new Card("Port", CardType.COMMERCIAL, 3, 3);
export const port2 = new Card("Port", CardType.COMMERCIAL, 4, 3);
export const chambreDeCommerce1 = new Card(
	"Chambre de commerce",
	CardType.COMMERCIAL,
	4,
	3,
);
export const chambreDeCommerce2 = new Card(
	"Chambre de commerce",
	CardType.COMMERCIAL,
	6,
	3,
);
export const phare1 = new Card("Phare", CardType.COMMERCIAL, 3, 3);
export const phare2 = new Card("Phare", CardType.COMMERCIAL, 6, 3);
export const arene1 = new Card("Arène", CardType.COMMERCIAL, 3, 3);
export const arene2 = new Card("Arène", CardType.COMMERCIAL, 5, 3);
export const ludus1 = new Card("Ludus", CardType.COMMERCIAL, 5, 3);
export const ludus2 = new Card("Ludus", CardType.COMMERCIAL, 7, 3);

// Guildes
export const guildeDesTravailleurs1 = new Card(
	"Guilde des travailleurs",
	CardType.GUILD,
	3,
	3,
);
export const guildeDesArtisans1 = new Card(
	"Guilde des artisans",
	CardType.GUILD,
	3,
	3,
);
export const guildeDesCommercants1 = new Card(
	"Guilde des commerçants",
	CardType.GUILD,
	3,
	3,
);
export const guildeDesPhilosophes1 = new Card(
	"Guilde des philosophes",
	CardType.GUILD,
	3,
	3,
);
export const guildeDesEspions1 = new Card(
	"Guilde des espions",
	CardType.GUILD,
	3,
	3,
);
export const guildeDesArmateurs1 = new Card(
	"Guilde des armateurs",
	CardType.GUILD,
	3,
	3,
);
export const guildeDesScientifiques1 = new Card(
	"Guilde des scientifiques",
	CardType.GUILD,
	3,
	3,
);
export const guildeDesMagistrats1 = new Card(
	"Guilde des magistrats",
	CardType.GUILD,
	3,
	3,
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

export const ALL_CARDS: Card[] = [
	// Matières Premières
	chantier1,
	chantier2,
	cavite1,
	cavite2,
	bassinArgileux1,
	bassinArgileux2,
	filon1,
	filon2,
	friche,
	excavation,
	fosseArgileuse,
	exploitationForestiere,
	gisement,
	mine,
	scierie1,
	scierie2,
	carriere1,
	carriere2,
	briquetterie1,
	briquetterie2,
	fonderie1,
	fonderie2,

	// Produits Manufacturés
	verrerie1,
	verrerie2,
	presse1,
	presse2,
	metierATisser1,
	metierATisser2,
	verrerie3,
	verrerie4,
	presse3,
	presse4,
	metierATisser3,
	metierATisser4,

	// Bâtiments Militaires
	palissade1,
	palissade2,
	caserne1,
	caserne2,
	tourDeGarde1,
	tourDeGarde2,
	ecuries1,
	ecuries2,
	champsDeTir1,
	champsDeTir2,
	muraille1,
	muraille2,
	placeDArmes1,
	placeDArmes2,
	placeDArmes3,
	castrum1,
	castrum2,
	fortifications1,
	fortifications2,
	cirque1,
	cirque2,
	arsenal1,
	arsenal2,
	atelierDeSieges1,
	atelierDeSieges2,

	// Bâtiments Scientifiques
	scriptorium1,
	scriptorium2,
	atelier1,
	atelier2,
	officine1,
	officine2,
	laboratoire1,
	laboratoire2,
	bibliotheque1,
	bibliotheque2,
	ecole1,
	ecole2,
	dispensaire1,
	dispensaire2,
	academie1,
	academie2,
	observatoire1,
	observatoire2,
	universite1,
	universite2,
	etude1,
	etude2,
	loge1,
	loge2,

	// Bâtiments Civils
	autel1,
	autel2,
	theatre1,
	theatre2,
	bains1,
	bains2,
	puits1,
	puits2,
	aqueduc1,
	aqueduc2,
	temple1,
	temple2,
	statue1,
	statue2,
	tribunal1,
	tribunal2,
	pantheon1,
	pantheon2,
	jardins1,
	jardins2,
	hotelDeVille1,
	hotelDeVille2,
	palace1,
	palace2,
	senat1,
	senat2,

	// Bâtiments Commerciaux
	taverne1,
	taverne2,
	taverne3,
	comptoirEst1,
	comptoirEst2,
	comptoirOuest1,
	comptoirOuest2,
	marche1,
	marche2,
	forum1,
	forum2,
	forum3,
	caravansarai1,
	caravansarai2,
	caravansarai3,
	vignoble1,
	vignoble2,
	bazar1,
	bazar2,
	port1,
	port2,
	chambreDeCommerce1,
	chambreDeCommerce2,
	phare1,
	phare2,
	arene1,
	arene2,
	ludus1,
	ludus2,

	// Guildes
	guildeDesTravailleurs1,
	guildeDesArtisans1,
	guildeDesCommercants1,
	guildeDesPhilosophes1,
	guildeDesEspions1,
	guildeDesArmateurs1,
	guildeDesScientifiques1,
	guildeDesMagistrats1,
	guildeDesBatisseurs1,
	guildeDesDecorateurs1,
];
