import { CardType } from "./card-type";
import { Card } from "./card.value-object";

// Matières Premières
const chantier1 = new Card('Chantier', CardType.RAW_MATERIAL, 3, 1);
const chantier2 = new Card('Chantier', CardType.RAW_MATERIAL, 4, 1);
const cavite1 = new Card('Cavité', CardType.RAW_MATERIAL, 3, 1);
const cavite2 = new Card('Cavité', CardType.RAW_MATERIAL, 5, 1);
const bassinArgileux1 = new Card('Bassin Argileux', CardType.RAW_MATERIAL, 3, 1);
const bassinArgileux2 = new Card('Bassin Argileux', CardType.RAW_MATERIAL, 5, 1);
const filon1 = new Card('Filon', CardType.RAW_MATERIAL, 3, 1);
const filon2 = new Card('Filon', CardType.RAW_MATERIAL, 4, 1);
const friche = new Card('Friche', CardType.RAW_MATERIAL, 6, 1);
const excavation = new Card('Excavation', CardType.RAW_MATERIAL, 4, 1);
const fosseArgileuse = new Card('Fosse Argileuse', CardType.RAW_MATERIAL, 3, 1);
const exploitationForestiere = new Card('Exploitation Forestière', CardType.RAW_MATERIAL, 3, 1);
const gisement = new Card('Gisement', CardType.RAW_MATERIAL, 5, 1);
const mine = new Card('Mine', CardType.RAW_MATERIAL, 6, 1);
const scierie1 = new Card('Scierie', CardType.RAW_MATERIAL, 3, 2);
const scierie2 = new Card('Scierie', CardType.RAW_MATERIAL, 4, 2);
const carriere1 = new Card('Carrière', CardType.RAW_MATERIAL, 3, 2);
const carriere2 = new Card('Carrière', CardType.RAW_MATERIAL, 4, 2);
const briquetterie1 = new Card('Briquetterie', CardType.RAW_MATERIAL, 3, 2);
const briquetterie2 = new Card('Briquetterie', CardType.RAW_MATERIAL, 4, 2);
const fonderie1 = new Card('Fonderie', CardType.RAW_MATERIAL, 3, 2);
const fonderie2 = new Card('Fonderie', CardType.RAW_MATERIAL, 4, 2);

// Produits Manufacturés
const verrerie1 = new Card('Verrerie', CardType.MANUFACTURED_GOOD, 3, 1);
const verrerie2 = new Card('Verrerie', CardType.MANUFACTURED_GOOD, 6, 1);
const presse1 = new Card('Presse', CardType.MANUFACTURED_GOOD, 3, 1);
const presse2 = new Card('Presse', CardType.MANUFACTURED_GOOD, 6, 1);
const metierATisser1 = new Card('Métier à Tisser', CardType.MANUFACTURED_GOOD, 3, 1);
const metierATisser2 = new Card('Métier à Tisser', CardType.MANUFACTURED_GOOD, 6, 1);

const verrerie3 = new Card('Verrerie', CardType.MANUFACTURED_GOOD, 3, 2);
const verrerie4 = new Card('Verrerie', CardType.MANUFACTURED_GOOD, 5, 2);
const presse3 = new Card('Presse', CardType.MANUFACTURED_GOOD, 3, 2);
const presse4 = new Card('Presse', CardType.MANUFACTURED_GOOD, 5, 2);
const metierATisser3 = new Card('Métier à Tisser', CardType.MANUFACTURED_GOOD, 3, 2);
const metierATisser4 = new Card('Métier à Tisser', CardType.MANUFACTURED_GOOD, 5, 2);

// Bâtiments Militaires
const palissade1 = new Card('Palissade', CardType.MILITARY, 3, 1);
const palissade2 = new Card('Palissade', CardType.MILITARY, 7, 1);
const caserne1 = new Card('Caserne', CardType.MILITARY, 3, 1);
const caserne2 = new Card('Caserne', CardType.MILITARY, 5, 1);
const tourDeGarde1 = new Card('Tour de garde', CardType.MILITARY, 3, 1);
const tourDeGarde2 = new Card('Tour de garde', CardType.MILITARY, 4, 1);
const ecuries1 = new Card('Écuries', CardType.MILITARY, 3, 2);
const ecuries2 = new Card('Écuries', CardType.MILITARY, 5, 2);
const champsDeTir1 = new Card('Champs de tir', CardType.MILITARY, 3, 2);
const champsDeTir2 = new Card('Champs de tir', CardType.MILITARY, 6, 2);
const muraille1 = new Card('Muraille', CardType.MILITARY, 3, 2);
const muraille2 = new Card('Muraille', CardType.MILITARY, 7, 2);
const placeDArmes1 = new Card("Place d'armes", CardType.MILITARY, 4, 2);
const placeDArmes2 = new Card("Place d'armes", CardType.MILITARY, 6, 2);
const placeDArmes3 = new Card("Place d'armes", CardType.MILITARY, 7, 2);
const castrum1 = new Card("Castrum", CardType.MILITARY, 4, 3);
const castrum2 = new Card("Castrum", CardType.MILITARY, 7, 3);
const fortifications1 = new Card('Fortifications', CardType.MILITARY, 3, 3);
const fortifications2 = new Card('Fortifications', CardType.MILITARY, 7, 3);
const cirque1 = new Card('Cirque', CardType.MILITARY, 4, 3);
const cirque2 = new Card('Cirque', CardType.MILITARY, 6, 3);
const arsenal1 = new Card('Arsenal', CardType.MILITARY, 3, 3);
const arsenal2 = new Card('Arsenal', CardType.MILITARY, 5, 3);
const atelierDeSieges1 = new Card("Atelier de sièges", CardType.MILITARY, 3, 3);
const atelierDeSieges2 = new Card("Atelier de sièges", CardType.MILITARY, 5, 3);

// Bâtiments Scientifiques
const scriptorium1 = new Card('Scriptorium', CardType.SCIENCE, 3, 1);
const scriptorium2 = new Card('Scriptorium', CardType.SCIENCE, 4, 1);
const atelier1 = new Card('Atelier', CardType.SCIENCE, 3, 1);
const atelier2 = new Card('Atelier', CardType.SCIENCE, 7, 1);
const officine1 = new Card('Officine', CardType.SCIENCE, 3, 1);
const officine2 = new Card('Officine', CardType.SCIENCE, 5, 1);
const laboratoire1 = new Card('Laboratoire', CardType.SCIENCE, 3, 2);
const laboratoire2 = new Card('Laboratoire', CardType.SCIENCE, 5, 2);
const bibliotheque1 = new Card('Bibliothèque', CardType.SCIENCE, 3, 2);
const bibliotheque2 = new Card('Bibliothèque', CardType.SCIENCE, 6, 2);
const ecole1 = new Card('École', CardType.SCIENCE, 3, 2);
const ecole2 = new Card('École', CardType.SCIENCE, 7, 2);
const dispensaire1 = new Card('Dispensaire', CardType.SCIENCE, 3, 2);
const dispensaire2 = new Card('Dispensaire', CardType.SCIENCE, 4, 2);
const academie1 = new Card('Académie', CardType.SCIENCE, 3, 3);
const academie2 = new Card('Académie', CardType.SCIENCE, 7, 3);
const observatoire1 = new Card('Observatoire', CardType.SCIENCE, 3, 3);
const observatoire2 = new Card('Observatoire', CardType.SCIENCE, 7, 3);
const universite1 = new Card('Université', CardType.SCIENCE, 3, 3);
const universite2 = new Card('Université', CardType.SCIENCE, 4, 3);
const etude1 = new Card('Étude', CardType.SCIENCE, 3, 3);
const etude2 = new Card('Étude', CardType.SCIENCE, 5, 3);
const loge1 = new Card('Loge', CardType.SCIENCE, 3, 3);
const loge2 = new Card('Loge', CardType.SCIENCE, 6, 3);

// Bâtiments Civils
const autel1 = new Card('Autel', CardType.CIVIL, 3, 1);
const autel2 = new Card('Autel', CardType.CIVIL, 5, 1);
const theatre1 = new Card('Théâtre', CardType.CIVIL, 3, 1);
const theatre2 = new Card('Théâtre', CardType.CIVIL, 6, 1);
const bains1 = new Card('Bains', CardType.CIVIL, 3, 1);
const bains2 = new Card('Bains', CardType.CIVIL, 7, 1);
const puits1 = new Card('Puits', CardType.CIVIL, 3, 1);
const puits2 = new Card('Puits', CardType.CIVIL, 7, 1);
const aqueduc1 = new Card('Aqueduc', CardType.CIVIL, 3, 2);
const aqueduc2 = new Card('Aqueduc', CardType.CIVIL, 7, 2);
const temple1 = new Card('Temple', CardType.CIVIL, 3, 2);
const temple2 = new Card('Temple', CardType.CIVIL, 6, 2);
const statue1 = new Card('Statue', CardType.CIVIL, 3, 2);
const statue2 = new Card('Statue', CardType.CIVIL, 7, 2);
const tribunal1 = new Card('Tribunal', CardType.CIVIL, 3, 2);
const tribunal2 = new Card('Tribunal', CardType.CIVIL, 5, 2);
const pantheon1 = new Card('Panthéon', CardType.CIVIL, 3, 3);
const pantheon2 = new Card('Panthéon', CardType.CIVIL, 6, 3);
const jardins1 = new Card('Jardins', CardType.CIVIL, 3, 3);
const jardins2 = new Card('Jardins', CardType.CIVIL, 4, 3);
const hotelDeVille1 = new Card('Hôtel de ville', CardType.CIVIL, 3, 3);
const hotelDeVille2 = new Card('Hôtel de ville', CardType.CIVIL, 6, 3);
const palace1 = new Card('Palace', CardType.CIVIL, 3, 3);
const palace2 = new Card('Palace', CardType.CIVIL, 7, 3);
const senat1 = new Card('Sénat', CardType.CIVIL, 3, 3);
const senat2 = new Card('Sénat', CardType.CIVIL, 5, 3);

// Bâtiments Commerciaux
const taverne1 = new Card('Taverne', CardType.COMMERCIAL, 4, 1);
const taverne2 = new Card('Taverne', CardType.COMMERCIAL, 5, 1);
const taverne3 = new Card('Taverne', CardType.COMMERCIAL, 7, 1);
const comptoirEst1 = new Card('Comptoir Est', CardType.COMMERCIAL, 3, 1);
const comptoirEst2 = new Card('Comptoir Est', CardType.COMMERCIAL, 7, 1);
const comptoirOuest1 = new Card('Comptoir Ouest', CardType.COMMERCIAL, 3, 1);
const comptoirOuest2 = new Card('Comptoir Ouest', CardType.COMMERCIAL, 7, 1);
const marche1 = new Card('Marché', CardType.COMMERCIAL, 3, 1);
const marche2 = new Card('Marché', CardType.COMMERCIAL, 6, 1);
const forum1 = new Card('Forum', CardType.COMMERCIAL, 3, 2);
const forum2 = new Card('Forum', CardType.COMMERCIAL, 6, 2);
const forum3 = new Card('Forum', CardType.COMMERCIAL, 7, 2);
const caravansarai1 = new Card('Caravansérail', CardType.COMMERCIAL, 3, 2);
const caravansarai2 = new Card('Caravansérail', CardType.COMMERCIAL, 5, 2);
const caravansarai3 = new Card('Caravansérail', CardType.COMMERCIAL, 6, 2);
const vignoble1 = new Card('Vignoble', CardType.COMMERCIAL, 3, 2);
const vignoble2 = new Card('Vignoble', CardType.COMMERCIAL, 6, 2);
const bazar1 = new Card('Bazar', CardType.COMMERCIAL, 4, 2);
const bazar2 = new Card('Bazar', CardType.COMMERCIAL, 7, 2);
const port1 = new Card('Port', CardType.COMMERCIAL, 3, 3);
const port2 = new Card('Port', CardType.COMMERCIAL, 4, 3);
const chambreDeCommerce1 = new Card('Chambre de commerce', CardType.COMMERCIAL, 4, 3);
const chambreDeCommerce2 = new Card('Chambre de commerce', CardType.COMMERCIAL, 6, 3);
const phare1 = new Card('Phare', CardType.COMMERCIAL, 3, 3);
const phare2 = new Card('Phare', CardType.COMMERCIAL, 6, 3);
const arene1 = new Card('Arène', CardType.COMMERCIAL, 3, 3);
const arene2 = new Card('Arène', CardType.COMMERCIAL, 5, 3);
const ludus1 = new Card('Ludus', CardType.COMMERCIAL, 5, 3);
const ludus2 = new Card('Ludus', CardType.COMMERCIAL, 7, 3);

// Guildes
const guildeDesTravailleurs1 = new Card('Guilde des travailleurs', CardType.GUILD, 3, 3);
const guildeDesArtisans1 = new Card('Guilde des artisans', CardType.GUILD, 3, 3);
const guildeDesCommercants1 = new Card('Guilde des commerçants', CardType.GUILD, 3, 3);
const guildeDesPhilosophes1 = new Card('Guilde des philosophes', CardType.GUILD, 3, 3);
const guildeDesEspions1 = new Card('Guilde des espions', CardType.GUILD, 3, 3);
const guildeDesArmateurs1 = new Card('Guilde des armateurs', CardType.GUILD, 3, 3);
const guildeDesScientifiques1 = new Card('Guilde des scientifiques', CardType.GUILD, 3, 3);
const guildeDesMagistrats1 = new Card('Guilde des magistrats', CardType.GUILD, 3, 3);
const guildeDesBatisseurs1 = new Card('Guilde des bâtisseurs', CardType.GUILD, 3, 3);
const guildeDesDecorateurs1 = new Card('Guilde des décorateurs', CardType.GUILD, 3, 3);

export const ALL_CARDS: Card[] = [
  // Matières Premières
  chantier1, chantier2, cavite1, cavite2, bassinArgileux1, bassinArgileux2, filon1, filon2,
  friche, excavation, fosseArgileuse, exploitationForestiere, gisement, mine,
  scierie1, scierie2, carriere1, carriere2, briquetterie1, briquetterie2, fonderie1, fonderie2,

  // Produits Manufacturés
  verrerie1, verrerie2, presse1, presse2, metierATisser1, metierATisser2,
  verrerie3, verrerie4, presse3, presse4, metierATisser3, metierATisser4,

  // Bâtiments Militaires
  palissade1, palissade2, caserne1, caserne2, tourDeGarde1, tourDeGarde2,
  ecuries1, ecuries2, champsDeTir1, champsDeTir2, muraille1, muraille2, placeDArmes1, placeDArmes2, placeDArmes3,
  castrum1, castrum2, fortifications1, fortifications2, cirque1, cirque2, arsenal1, arsenal2, atelierDeSieges1, atelierDeSieges2,

  // Bâtiments Scientifiques
  scriptorium1, scriptorium2, atelier1, atelier2, officine1, officine2,
  laboratoire1, laboratoire2, bibliotheque1, bibliotheque2, ecole1, ecole2, dispensaire1, dispensaire2,
  academie1, academie2, observatoire1, observatoire2, universite1, universite2, etude1, etude2, loge1, loge2,

  // Bâtiments Civils
  autel1, autel2, theatre1, theatre2, bains1, bains2, puits1, puits2,
  aqueduc1, aqueduc2, temple1, temple2, statue1, statue2, tribunal1, tribunal2,
  pantheon1, pantheon2, jardins1, jardins2, hotelDeVille1, hotelDeVille2, palace1, palace2, senat1, senat2,

  // Bâtiments Commerciaux
  taverne1, taverne2, taverne3, comptoirEst1, comptoirEst2, comptoirOuest1, comptoirOuest2, marche1, marche2,
  forum1, forum2, forum3, caravansarai1, caravansarai2, caravansarai3, vignoble1, vignoble2, bazar1, bazar2,
  port1, port2, chambreDeCommerce1, chambreDeCommerce2, phare1, phare2, arene1, arene2, ludus1, ludus2,
  
  // Guildes
  guildeDesTravailleurs1, guildeDesArtisans1, guildeDesCommercants1, guildeDesPhilosophes1, guildeDesEspions1, guildeDesArmateurs1, guildeDesScientifiques1, guildeDesMagistrats1, guildeDesBatisseurs1, guildeDesDecorateurs1,
];
